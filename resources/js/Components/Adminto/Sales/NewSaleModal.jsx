import { useEffect, useRef, useState } from "react";
import Modal from "../Modal"
import SelectFormGroup from "../form/SelectFormGroup";
import { renderToString } from "react-dom/server";
import InputFormGroup from "../form/InputFormGroup";
import places from '../../../Components/Product/components/places.json';
import TextareaFormGroup from "../form/TextareaFormGroup";
import Tippy from "@tippyjs/react";
import CouponsRest from "../../../Actions/CouponsRest";
import Number2Currency from "../../../Utils/Number2Currency";
import SalesRest from "../../../Actions/Admin/SalesRest";

const couponsRest = new CouponsRest()
const salesRest = new SalesRest()

const NewSaleModal = ({ modalRef, gridRef, items, phone_prefixes = [], bundles }) => {

  if (!modalRef) modalRef = useRef()

  const [sale, setSale] = useState({});
  const [cart, setCart] = useState([]);

  const [couponCode, setCouponCode] = useState('');
  const [coupon, setCoupon] = useState(null);

  const calculateBundle = (cart) => {
    const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
    const bundle = bundles.find(bundle => {
      switch (bundle.comparator) {
        case '<':
          return totalQuantity < bundle.items_quantity
        case '>':
          return totalQuantity > bundle.items_quantity
        default:
          return totalQuantity == bundle.items_quantity
      }
    });
    return bundle;
  }
  const calculateCouponDiscount = (coupon, totalPrice) => {
    if (!coupon) return 0
    const amount = Number(coupon.amount) || 0
    if (coupon.type == 'fixed_amount') {
      return amount
    } else if (coupon.type == 'percentage') {
      return (totalPrice - bundleDiscount) * amount / 100
    } else {
      return 0
    }
  }

  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const bundle = calculateBundle(cart); // Implementar esta función según la lógica de bundles
  const bundleDiscount = totalPrice * (bundle?.percentage || 0);
  const couponDiscount = calculateCouponDiscount(coupon, totalPrice); // Implementar esta función
  const finalPrice = totalPrice - bundleDiscount - couponDiscount;

  const onColorClick = (index, color) => {
    const newCart = [...cart];
    const item = newCart[index];
    item.colors.push(color)
    item.quantity = item.colors.length
    setCart(newCart);
  };

  const onColorBadgeClick = (index, colorId) => {
    const newCart = [...cart];
    const item = newCart[index];
    item.colors = item.colors.filter(x => x.id !== colorId);
    item.quantity = item.colors.length
    setCart(newCart);
  };

  const onQuantityChange = (index, quantity) => {
    const newCart = [...cart];
    const item = newCart[index];
    item.quantity = quantity
    setCart(newCart);
  };

  const onApplyCoupon = async () => {
    const result = await couponsRest.save({
      coupon: couponCode,
      amount: totalPrice,
      email: sale.email
    })
    if (result) setCoupon(result.data)
    else setCoupon(null)
  };

  const getSale = () => {
    let department = 'Lima';
    let province = 'Lima'
    let district = null

    if (Array.isArray(places[sale.department].items)) {
      department = places[sale.department].name
      province = sale.province
      district = null
    } else {
      department = sale.province
      province = null
      district = sale.district
    }

    return {
      ...sale,
      country: 'Perú',
      department_code: sale.department,
      department, province, district
    }
  }

  const onModalSubmit = async (e) => {
    e.preventDefault()

    const request = {
      sale: {
        ...getSale(),
        coupon: coupon?.name || null,
      },
      details: cart
    }

    const result = await salesRest.pos(request)
    if (!result) return

    $(gridRef.current).dxDataGrid('instance').refresh()
    $(modalRef.current).modal('hide')
  }

  const prefixTemplate = (data) => {
    if (!data.id) {
      return data.text;
    }
    const prefix = data.element.dataset.code
    const flag = data.element.dataset.flag
    const country = data.element.dataset.country
    const container = renderToString(<>
      <span className="font-emoji text-center">{flag}</span>
      <b className="ms-1">{prefix}</b>
      <small className="d-block text-truncate">{country}</small>
    </>)
    return $(container)
  }

  useEffect(() => {
    $(modalRef.current).on('shown.bs.modal', () => {
      setSale({
        billing_type: 'boleta',
        phone_prefix: '51'
      })
      setCart(items.filter(({ is_default }) => is_default).map(item => {
        return {
          id: item.id,
          name: item.name,
          price: item.price,
          colors: [],
          quantity: 0
        }
      }))
      setCouponCode('')
      setCoupon(null)
    })
  }, [])

  return <Modal id="new-sale-modal" modalRef={modalRef} title='Nueva venta' size='lg' isStatic hideFooter onSubmit={onModalSubmit}>
    <div className="row">
      <div className="col-md-6">
        <h4 className='mt-0'>Información del cliente</h4>
        <div className="mb-2">
          <label className="form-label">
            Tipo de comprobante <span className="text-danger">*</span>
          </label>
          <div className="row g-2">
            <div className="col-6">
              <label htmlFor="billing_type_boleta" className="card border mb-0">
                <div className="card-body p-1 px-2 d-flex align-items-center  gap-1">
                  <input
                    type="radio"
                    className="form-check-input"
                    name="billing_type"
                    id="billing_type_boleta"
                    value="boleta"
                    style={{marginTop : '-2px'}}
                    checked={sale.billing_type === 'boleta'}
                    onChange={(e) => setSale(old => ({ ...old, billing_type: e.target.value }))}
                    required
                  />
                  <span className="d-flex align-items-center justify-content-center gap-1" htmlFor="billing_type_boleta">
                    <i className="mdi mdi-account font-18"></i>
                    <span>Boleta</span>
                  </span>
                </div>
              </label>
            </div>
            <div className="col-6">
              <label htmlFor="billing_type_factura" className="card border mb-0">
                <div className="card-body p-1 px-2 d-flex align-items-center gap-1">
                  <input
                    type="radio"
                    className="form-check-input"
                    name="billing_type"
                    id="billing_type_factura"
                    value="factura"
                    style={{marginTop : '-2px'}}
                    checked={sale.billing_type === 'factura'}
                    onChange={(e) => setSale(old => ({ ...old, billing_type: e.target.value }))}
                    required
                  />
                  <span className="d-flex align-items-center justify-content-center gap-1" htmlFor="billing_type_factura">
                    <i className="mdi mdi-office-building font-18"></i>
                    <span>Factura</span>
                  </span>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Número de documento */}
        <div className="mb-2">
          <label className="form-label" htmlFor="billing_number">
            Documento <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            id="billing_number"
            className="form-control"
            value={sale.billing_number || ''}
            maxLength={sale.billing_type === 'boleta' ? 8 : 11}
            minLength={sale.billing_type === 'boleta' ? 8 : 11}
            required
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, '');
              setSale(old => ({ ...old, billing_number: value }));
            }}
          />
        </div>
        <div className="row">
          <InputFormGroup label='Nombres'
            col='col-md-6'
            value={sale.name}
            onChange={(e) => setSale(old => ({ ...old, name: e.target.value }))}
            required />
          <InputFormGroup label='Apellidos'
            col='col-md-6'
            value={sale.lastname}
            onChange={(e) => setSale(old => ({ ...old, lastname: e.target.value }))}
            required />
        </div>
        <InputFormGroup label='Email'
          type="email"
          value={sale.email}
          onChange={(e) => setSale(old => ({ ...old, email: e.target.value }))} // Implementar lógica para cambiar email
          required />
        <label htmlFor="" className='form-label'>
          Celular
        </label>
        <div className="row">
          <SelectFormGroup
            col='col-md-4'
            dropdownParent='#new-sale-modal'
            minimumInputLength={-1}
            templateResult={prefixTemplate}
            templateSelection={prefixTemplate}
            value={sale.phone_prefix}
            onChange={e => setSale(old => ({ ...old, phone_prefix: e.target.value }))}>
            {
              phone_prefixes
                .sort((a, b) => a.country.localeCompare(b.country))
                .map((prefix, index) => (
                  <option
                    key={index}
                    value={prefix.realCode}
                    data-code={prefix.beautyCode}
                    data-flag={prefix.flag}
                    data-country={prefix.country}
                  >
                    {prefix.beautyCode} {prefix.country}
                  </option>
                ))
            }
          </SelectFormGroup>
          <InputFormGroup
            col='col-md-8'
            type="tel"
            value={sale.phone}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, '');
              setSale(old => ({ ...old, phone: value }));
            }} />
        </div>

        <div className="mb-2">
          <SelectFormGroup
            label='Origen de venta'
            minimumResultsForSearch={-1}
            dropdownParent='#new-sale-modal'
            value={sale.origin}
            onChange={(e) => setSale(old => ({ ...old, origin: e.target.value }))}
            required
          >
            <option value="">Elige una opción</option>
            <option value="Banner">Banner publicitario</option>
            <option value="Facebook">Facebook</option>
            <option value="Instagram">Instagram</option>
            <option value="WhatsApp">WhatsApp</option>
            <option value="TikTok">TikTok</option>
          </SelectFormGroup>
        </div>
        <TextareaFormGroup label='Comentario interno'
          value={sale.origin_comment}
          onChange={(e) => setSale(old => ({ ...old, origin_comment: e.target.value }))}
          placeholder="Ingresa un comentario sobre por qué se está creando esta venta..."
        />
      </div>
      <div className="col-md-6">
        <h4 className='mt-0'>Dirección del cliente</h4>
        <InputFormGroup label='Pais' value='Perú' disabled required />
        <SelectFormGroup label='Región / Provincia'
          value={sale.department || ''}
          onChange={(e) => setSale(old => ({ ...old, department: e.target.value }))}
          minimumResultsForSearch={-1}
          dropdownParent='#new-sale-modal'
          required
        >
          <option value=''>Elige una opción</option>
          {
            Object.keys(places).map((key, index) => {
              return <option key={index} value={key}>{places[key].name}</option>
            })
          }
        </SelectFormGroup>
        {
          places[sale.department] &&
          <div className="row">
            {
              Array.isArray(places[sale.department].items)
                ? <SelectFormGroup
                  label='Provincia'
                  col='col-md-8'
                  dropdownParent='#new-sale-modal'
                  value={sale.province}
                  effectWith={[sale.department]}
                  onChange={(e) => setSale(old => ({ ...old, province: e.target.value }))}
                  required>
                  <option value=''>Elige una opción</option>
                  {
                    places[sale.department].items.map((province, index) => {
                      return <option key={index} value={province}>{province}</option>
                    })
                  }
                </SelectFormGroup>
                : <>
                  <InputFormGroup label='Departamento'
                    col='col-md-4'
                    value={sale.province}
                    onChange={(e) => setSale(old => ({ ...old, province: e.target.value }))}
                    required />
                  <InputFormGroup label='Distrito'
                    col='col-md-4'
                    value={sale.district}
                    onChange={(e) => setSale(old => ({ ...old, district: e.target.value }))}
                    required />
                </>
            }
            <InputFormGroup label='Cód. Postal'
              col='col-md-4'
              value={sale.zip_code}
              onChange={(e) => setSale(old => ({ ...old, zip_code: e.target.value }))}
            />
          </div>
        }
        <div className="row">
          <InputFormGroup label='Dirección'
            col={'col-md-8'}
            value={sale.address}
            onChange={(e) => setSale(old => ({ ...old, address: e.target.value }))}
            required />
          <InputFormGroup label='Número'
            col={'col-md-4'}
            type="number"
            value={sale.number}
            onChange={(e) => setSale(old => ({ ...old, number: e.target.value }))} 
            required/>
        </div>
        <InputFormGroup label='Apartamento, habitación, piso, etc.'
          value={sale.reference}
          onChange={(e) => setSale(old => ({ ...old, reference: e.target.value }))}
        />
        <TextareaFormGroup label='Notas del pedido'
          value={sale.comment}
          placeholder='Notas sobre el pedido, por ejemplo, notas especiales para la entrega.'
          onChange={(e) => setSale(old => ({ ...old, comment: e.target.value }))}
        />
      </div>

      <div className="col-12">
        <div className="mb-2">
          <h4 className="mb-0">Productos</h4>
          <small className="text-muted">Selecciona los productos que deseas agregar a la compra</small>
        </div>

        {/* Nuevo componente de selección de productos tipo checkout */}
        <div className="product-selection mb-1">
          <div className="row">
            {items.map((product) => {
              const isSelected = cart.some(item => item.id === product.id);
              return <div className="col-sm-6 col-md-3 mb-2" key={product.id}>
                <div
                  className={`card mb-0 h-100 cursor-pointer shadow-lg ${isSelected ? 'border border-primary' : ''}`}
                  onClick={() => {
                    if (!isSelected) {
                      setCart([...cart, {
                        id: product.id,
                        name: product.name,
                        price: product.price,
                        colors: [],
                        quantity: 0
                      }]);
                    } else {
                      const newCart = [...cart];
                      newCart.splice(newCart.findIndex(item => item.id === product.id), 1);
                      setCart(newCart);
                    }
                  }}
                >
                  <div className="card-body p-2">
                    <h5 className={`card-title mt-0 mb-0 ${isSelected ? 'text-primary' : ''}`}>{product.name}</h5>
                    <small className="card-text text-muted">S/ {product.price || 79.90}</small>
                  </div>
                </div>
              </div>
            })}
          </div>
        </div>

        <div className="table-responsive">
          <table className="table table-centered table-nowrap table-bordered table-sm">
            <thead>
              <tr>
                <th>Producto</th>
                <th>Color</th>
                <th style={{ width: '92px' }}>Cant.</th>
                <th style={{ width: '88px' }}>Precio</th>
                <th style={{ width: '88px' }}>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((detail, index) => {
                const product = items.find(item => item.id === detail.id);
                const colors = product?.colors || [];
                const colorsCount = detail.colors?.length ?? 0;
                return <tr key={index}>
                  <td>
                    {product?.name || 'Producto no encontrado'}
                  </td>
                  <td style={{ width: '240px' }}>
                    <div className="d-flex flex-wrap gap-1">
                      {colors.map(color => {
                        const selecteds = detail.colors.filter(x => x.id === color.id).length;
                        return (
                          <Tippy key={color.id} content={color.name}>
                            <div
                              onClick={() => onColorClick(index, color)}
                              className="position-relative cursor-pointer"
                            >
                              <div
                                className={`rounded-circle position-relative p-2 border ${selecteds > 0 ? 'border-primary' : ''}`}
                                style={{ backgroundColor: color.hex }}
                              ></div>
                              {selecteds > 0 && (
                                <small
                                  className="position-absolute translate-middle badge rounded-pill bg-primary"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    onColorBadgeClick(index, color.id);
                                  }}
                                  style={{
                                    padding: '2px 4px',
                                    top: '4px',
                                    fontSize: '10px',
                                    right: '-12px',
                                  }}
                                >
                                  {selecteds}
                                </small>
                              )}
                            </div>
                          </Tippy>
                        );
                      })}
                    </div>
                  </td>
                  <td>{
                    colors.length == 0
                      ? <input
                        className="form-control form-control-sm"
                        type="number"
                        style={{ width: '75px' }}
                        value={detail.quantity}
                        onChange={e => onQuantityChange(index, e.target.value)} />
                      : detail.quantity
                  }</td>
                  <td className="text-end">S/ {detail.price}</td>
                  <td className="text-end">S/ {(detail.price * detail.quantity).toFixed(2)}</td>
                </tr>
              })}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={4} className="text-end">Subtotal:</td>
                <td className="text-end">S/ {totalPrice.toFixed(2)}</td>
              </tr>
              {bundle && (
                <tr>
                  <td colSpan={4} className="text-end">
                    <span className="d-block">Descuento por paquete</span>
                    <small className="text-muted -mt-1">
                      Escogiste un {bundle.name} ({(bundle.percentage * 100).toFixed(2)}%)
                    </small>
                  </td>
                  <td className="text-end">S/ -{Number2Currency(Math.round(bundleDiscount * 10) / 10)}</td>
                </tr>
              )}
              {coupon && (
                <tr>
                  <td colSpan={4} className="text-end">
                    <span className="d-block">
                      Cupón aplicado
                      <Tippy content='Eliminar'>
                        <i className="text-danger mdi mdi-close cursor-pointer ms-1" onClick={() => setCoupon(null)} />
                      </Tippy>
                    </span>
                    <small className="text-muted">{coupon.name} ({coupon.type == 'fixed_amount' ? `S/ -${Number2Currency(coupon.amount)}` : `-${Math.round(coupon.amount * 100) / 100}%`})</small>
                  </td>
                  <td className="text-end">S/ -{Number2Currency(Math.round(couponDiscount * 10) / 10)}</td>
                </tr>
              )}
              <tr>
                <td colSpan={4} className="text-end">Total:</td>
                <td className="text-end">S/ {Number2Currency(Math.round(finalPrice * 10) / 10)}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>

    <div className="row">
      <div className="col-md-6">{
        !coupon &&
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Código de cupón"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
          />
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onApplyCoupon}
          >
            Aplicar cupón
          </button>
        </div>
      }
      </div>
      <div className="col-md-6 text-end">
        {/* <button type="button" className="btn btn-light me-2" onClick={() => $(modalRef.current).modal('hide')}>
          Cancelar
        </button> */}
        <button type="submit" className="btn btn-primary">
          Guardar venta
        </button>
      </div>
    </div>
  </Modal>
}

export default NewSaleModal