import { useRef, useState } from "react";
import Modal from "../Modal"
import SelectFormGroup from "../form/SelectFormGroup";
import { renderToString } from "react-dom/server";
import InputFormGroup from "../form/InputFormGroup";

const NewSaleModal = ({ modalRef, phone_prefixes = [] }) => {

  if (!modalRef) modalRef = useRef()

  const [sale, setSale] = useState([]);
  const [cart, setCart] = useState([]);
  const [couponCode, setCouponCode] = useState('');
  const [coupon, setCoupon] = useState(null);

  const calculateBundle = (cart) => {
    return null
  }
  const calculateCouponDiscount = (coupon, totalPrice) => {
    return 0
  } // Implementar esta funci

  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const bundle = calculateBundle(cart); // Implementar esta función según la lógica de bundles
  const bundleDiscount = totalPrice * (bundle?.percentage || 0);
  const couponDiscount = calculateCouponDiscount(coupon, totalPrice); // Implementar esta función
  const finalPrice = totalPrice - bundleDiscount - couponDiscount;

  const onAddProduct = () => {
    // Implementar lógica para agregar producto
  };

  const onColorChange = (index, colorId) => {
    // Implementar lógica para cambiar color
  };

  const onQuantityChange = (index, quantity) => {
    // Implementar lógica para cambiar cantidad
  };

  const onRemoveItem = (index) => {
    // Implementar lógica para remover item
  };

  const onApplyCoupon = async () => {
    // Implementar lógica para aplicar cupón
  };

  const onModalSubmit = () => {

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

  return <Modal id="new-sale-modal" modalRef={modalRef} title='Nueva venta' size='lg' isStatic hideFooter>
    <form onSubmit={onModalSubmit}>
      <div className="row">
        <div className="col-md-6">
          <h4 className='mt-0'>Información del cliente</h4>
          <div className="row">
            <div className="col-md-6 mb-2">
              <label className="form-label">
                Nombres
                <b className='text-danger ms-1' children='*' />
              </label>
              <input
                type="text"
                className="form-control"
                value={sale.name}
                onChange={(e) => setSale(old => ({ ...old, name: e.target.value }))}
                required
              />
            </div>
            <div className="col-md-6 mb-2">
              <label className="form-label">
                Apellidos
                <b className='text-danger ms-1' children='*' />
              </label>
              <input
                type="text"
                className="form-control"
                value={sale.lastname}
                onChange={(e) => setSale(old => ({ ...old, lastname: e.target.value }))}
                required
              />
            </div>
          </div>
          <div className="mb-2">
            <label className="form-label">
              Email
              <b className='text-danger ms-1' children='*' />
            </label>
            <input
              type="email"
              className="form-control"
              value={sale.email}
              onChange={(e) => setSale(old => ({ ...old, email: e.target.value }))}
              required
            />
          </div>
          <label htmlFor="" className='form-label'>
            Celular
            <b className='text-danger ms-1' children='*' />
          </label>
          <div className="row">
            <div className="col-md-4">
              <SelectFormGroup
                dropdownParent='#new-sale-modal'
                minimumInputLength={-1}
                templateResult={prefixTemplate}
                templateSelection={prefixTemplate}>
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
            </div>
            <div className="col-md-8 mb-2">
              <input
                type="tel"
                className="form-control"
                value={sale.phone}
                onChange={(e) => setSale(old => ({ ...old, phone: e.target.value }))}
                required
              />
            </div>
          </div>

          <div className="mb-2">
            <label className="form-label">
              Origen de venta
              <b className='text-danger ms-1' children='*' />
            </label>
            <select
              className="form-select"
              value={sale.source}
              onChange={(e) => setSale(old => ({ ...old, source: e.target.value }))}
              required
            >
              <option value="">Seleccionar origen</option>
              <option value="llamada">Llamada telefónica</option>
              <option value="whatsapp">WhatsApp</option>
              <option value="presencial">Presencial</option>
              <option value="otro">Otro</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Comentario interno</label>
            <textarea
              className="form-control"
              value={sale.internal_comment}
              onChange={(e) => setSale(old => ({ ...old, internal_comment: e.target.value }))}
              rows={3}
              placeholder="Ingresa un comentario sobre por qué se está creando esta venta desde interno..."
            ></textarea>
          </div>
        </div>
        <div className="col-md-6">
          <h4 className='mt-0'>Dirección del cliente</h4>
          <InputFormGroup label='Pais' value='Perú' disabled/>
        </div>

        <div className="col-12 mt-4">
          <h4>Productos</h4>
          <div className="table-responsive">
            <table className="table table-centered table-nowrap">
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Color</th>
                  <th>Cantidad</th>
                  <th>Precio</th>
                  <th>Subtotal</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item, index) => (
                  <tr key={index}>
                    <td>{item.name}</td>
                    <td>
                      <select
                        className="form-select"
                        value={item.color?.id}
                        onChange={(e) => onColorChange(index, e.target.value)}
                      >
                        <option value="">Seleccionar color</option>
                        {item.colors?.map((color, i) => (
                          <option key={i} value={color.id}>{color.name}</option>
                        ))}
                      </select>
                    </td>
                    <td>
                      <input
                        type="number"
                        className="form-control"
                        value={item.quantity}
                        onChange={(e) => onQuantityChange(index, e.target.value)}
                        min={1}
                      />
                    </td>
                    <td>S/.{item.price}</td>
                    <td>S/.{(item.price * item.quantity).toFixed(2)}</td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-danger btn-sm"
                        onClick={() => onRemoveItem(index)}
                      >
                        <i className="fa fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan={4} className="text-end">Subtotal:</td>
                  <td>S/.{totalPrice.toFixed(2)}</td>
                  <td></td>
                </tr>
                {bundle && (
                  <tr>
                    <td colSpan={4} className="text-end">Descuento por paquete ({(bundle.percentage * 100).toFixed(2)}%):</td>
                    <td>-S/.{bundleDiscount.toFixed(2)}</td>
                    <td></td>
                  </tr>
                )}
                {coupon && (
                  <tr>
                    <td colSpan={4} className="text-end">Cupón ({coupon.code}):</td>
                    <td>-S/.{couponDiscount.toFixed(2)}</td>
                    <td></td>
                  </tr>
                )}
                <tr>
                  <td colSpan={4} className="text-end">Total:</td>
                  <td>S/.{finalPrice.toFixed(2)}</td>
                  <td></td>
                </tr>
              </tfoot>
            </table>
          </div>

          <div className="row mt-3">
            <div className="col-md-6">
              <button
                type="button"
                className="btn btn-primary"
                onClick={onAddProduct}
              >
                <i className="fa fa-plus me-1"></i>
                Agregar producto
              </button>
            </div>
            <div className="col-md-6">
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
            </div>
          </div>
        </div>
      </div>

      <div className="text-end mt-4">
        <button type="button" className="btn btn-light me-2" onClick={() => $(modalRef.current).modal('hide')}>
          Cancelar
        </button>
        <button type="submit" className="btn btn-primary">
          Guardar venta
        </button>
      </div>
    </form>
  </Modal>
}

export default NewSaleModal