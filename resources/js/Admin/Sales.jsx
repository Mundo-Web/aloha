import BaseAdminto from '@Adminto/Base';
import Tippy from '@tippyjs/react';
import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import Swal from 'sweetalert2';
import SaleStatusesRest from '../Actions/Admin/SaleStatusesRest';
import SalesRest from '../Actions/Admin/SalesRest';
import Modal from '../Components/Modal';
import Table from '../Components/Adminto/Table';
import DxButton from '../Components/dx/DxButton';
import CreateReactScript from '../Utils/CreateReactScript';
import Global from '../Utils/Global';
import Number2Currency from '../Utils/Number2Currency';
import ReactAppend from '../Utils/ReactAppend';
import UserFormulaInfo from '../Components/Adminto/UserFormulas/UserFormulaInfo';
import places from '../Components/Product/components/places.json';

const salesRest = new SalesRest()
const saleStatusesRest = new SaleStatusesRest()

const Sales = ({ statuses, items, phone_prefixes }) => {
  const gridRef = useRef()
  const detailsModalRef = useRef()
  const modalRef = useRef()

  const [sale, setSale] = useState({
    name: '',
    lastname: '',
    email: '',
    phone: '',
    country: 'Perú',
    department: '',
    province: '',
    district: '',
    zip_code: '',
    address: '',
    number: '',
    reference: '',
    comment: '',
    billing_type: 'boleta',
    billing_number: '',
    items: []
  })

  const [saleItems, setSaleItems] = useState([{
    item_id: '',
    color_id: '',
    quantity: 1,
    price: 0
  }])

  const addItem = () => {
    setSaleItems([...saleItems, {
      item_id: '',
      color_id: '',
      quantity: 1,
      price: 0
    }])
  }

  const removeItem = (index) => {
    setSaleItems(saleItems.filter((_, i) => i !== index))
  }

  const updateItem = (index, field, value) => {
    const newItems = [...saleItems]
    newItems[index][field] = value
    setSaleItems(newItems)
  }

  const onModalSubmit = async (e) => {
    e.preventDefault()
    if (loading) return

    const request = {
      ...sale,
      items: saleItems,
      status: 'pending'
    }

    const result = await salesRest.save(request)
    if (!result) return

    $(gridRef.current).dxDataGrid('instance').refresh()
    $(modalRef.current).modal('hide')
  }

  const [saleLoaded, setSaleLoaded] = useState(null);
  const [saleStatuses, setSaleStatuses] = useState([]);

  const onStatusChange = async (e) => {
    const status_id = e.target.value
    const option = $(e.target).find(`option[value="${status_id}"]`)
    const confirm = option.data('confirm')

    if (confirm) {
      const { isConfirmed } = await Swal.fire({
        title: 'Actualizar estado',
        text: `¿Estás seguro de actualizar la venta al estado "${option.text()}"?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, actualizar',
        cancelButtonText: 'Cancelar'
      })
      if (!isConfirmed) return
    }

    const result = await salesRest.save({
      id: saleLoaded.id,
      status_id
    })
    if (!result) return
    setSaleLoaded(result.data)
    $(gridRef.current).dxDataGrid('instance').refresh()
  }

  const onDeleteClicked = async (id) => {
    const { isConfirmed } = await Swal.fire({
      title: 'Anular pedido',
      text: '¿Estas seguro de anular este pedido?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, anular',
      cancelButtonText: 'Cancelar'
    })
    if (!isConfirmed) return
    const result = await salesRest.delete(id)
    if (!result) return
    $(gridRef.current).dxDataGrid('instance').refresh()
  }

  const onModalOpen = async (saleId) => {
    setSaleStatuses([])
    const newSale = await salesRest.get(saleId)
    setSaleLoaded(newSale)
    $(detailsModalRef.current).modal('show');
  }

  useEffect(() => {
    if (!saleLoaded) return
    saleStatusesRest.bySale(saleLoaded.id).then((data) => {
      if (data) setSaleStatuses(data)
      else setSaleStatuses([])
    })
  }, [saleLoaded])

  const totalAmount = Number(saleLoaded?.amount)
    + Number(saleLoaded?.delivery)
    - Number(saleLoaded?.bundle_discount)
    - Number(saleLoaded?.renewal_discount)
    - Number(saleLoaded?.coupon_discount)

  const saleLoadedPhone = saleLoaded?.phone.clean('0-9').startsWith('51')
    ? saleLoaded?.phone.clean('0-9')
    : `51${saleLoaded?.phone.clean('0-9')}`

  return (<>
    <Table gridRef={gridRef} title='Pedidos' rest={salesRest}
      toolBar={(container) => {
        container.unshift({
          widget: 'dxButton', location: 'after',
          options: {
            icon: 'refresh',
            hint: 'Refrescar tabla',
            onClick: () => $(gridRef.current).dxDataGrid('instance').refresh()
          }
        });
        container.unshift({
          widget: 'dxButton', location: 'after',
          options: {
            icon: 'plus',
            hint: 'Agrega una venta manual',
            text: 'Nueva venta',
            onClick: () => $(modalRef.current).modal('show')
          }
        });
      }}
      exportable
      pageSize={25}
      columns={[
        {
          dataField: 'id',
          caption: 'ID',
          visible: false
        },
        {
          dataField: 'code',
          caption: 'Numero de orden',
          visible: false
        },
        {
          dataField: 'created_at',
          caption: 'Fecha',
          dataType: 'date',
          sortOrder: 'desc',
          width: '150px',
          cellTemplate: (container, { data }) => {
            container.css('cursor', 'pointer')
            container.on('click', () => {
              onModalOpen(data.id)
            })
            ReactAppend(container, <>
              <span className='d-block'>{moment(data.created_at.replace('Z', '-05:00')).fromNow()}</span>
              <small className='d-block text-muted'>{moment(data.created_at).format('lll')}</small>
            </>)
          }
        },
        {
          dataField: 'fullname',
          caption: 'Orden',
          width: '250px',
          cellTemplate: (container, { data }) => {
            container.css('cursor', 'pointer')
            container.on('click', () => {
              onModalOpen(data.id)
            })
            ReactAppend(container, <p className='mb-0' style={{ width: '100%' }}>
              <b className='d-block w-100 text-truncate'>
                {
                  data.renewal && <Tippy content={`Plan: ${data.renewal.name}`}>
                    <i className='fa fas fa-spa text-pink me-1'></i>
                  </Tippy>
                }
                {data.name} {data.lastname}
              </b>
              <small className='text-nowrap text-muted' style={{
                overflow: 'hidden',
                display: '-webkit-box',
                WebkitBoxOrient: 'vertical',
                WebkitLineClamp: 2,
                fontFamily: 'monospace'
              }}>#{Global.APP_CORRELATIVE}-{data.code}</small>
            </p>)
          }
        },
        {
          dataField: 'status.name',
          caption: 'Estado',
          width: '100px',
          cellTemplate: (container, { data }) => {
            ReactAppend(container, <>
              <Tippy content={data.status.description}>
                <span className='d-block mx-auto badge rounded-pill' style={{
                  backgroundColor: data.status.color ? `${data.status.color}2e` : '#3333332e',
                  color: data.status.color ?? '#333',
                  width: 'max-content',
                  marginBottom: '4px'
                }}>{data.status.name}</span>
              </Tippy>
            </>)
          }
        },
        {
          dataField: 'total_amount',
          caption: 'Total',
          dataType: 'number',
          width: '100px',
          cellTemplate: (container, { data }) => {
            container.text(`S/. ${Number2Currency(data.total_amount)}`);
          }
        },
        {
          dataField: 'phone',
          caption: 'Teléfono',
          width: '120px',
          cellTemplate: (container, { data }) => {
            container.text(data.phone.keep('0-9'))
          }
        },
        {
          dataField: 'email',
          caption: 'Email'
        },
        {
          dataField: 'department',
          caption: 'Departamento',
        },
        {
          dataField: 'province',
          caption: 'Ciudad',
          cellTemplate: (container, { data }) => {
            container.text(data.province || data.district);
          }
        },
        {
          caption: 'Acciones',
          cellTemplate: (container, { data }) => {
            container.append(DxButton({
              className: 'btn btn-xs btn-light',
              title: 'Ver pedido',
              icon: 'fa fa-eye',
              onClick: () => onModalOpen(data.id)
            }))
            !data.status.confirm &&
              container.append(DxButton({
                className: 'btn btn-xs btn-soft-danger',
                title: 'Anular pedido',
                icon: 'fa fa-trash',
                onClick: () => onDeleteClicked(data.id)
              }))
          },
          allowFiltering: false,
          allowExporting: false
        }
      ]} />
    <Modal modalRef={detailsModalRef} title={`Detalles del pedido #${Global.APP_CORRELATIVE}-${saleLoaded?.code}`} size='xl' bodyStyle={{
      backgroundColor: '#ebeff2'
    }} hideButtonSubmit >
      <div className="row">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header p-2">
              <h5 className="card-title mb-0">Detalles de Venta</h5>
            </div>
            <div className="card-body p-2">
              <table id='table-info' className="table table-borderless table-sm">
                <tbody>
                  <tr>
                    <th>Nombres:</th>
                    <td>{saleLoaded?.name} {saleLoaded?.lastname}</td>
                  </tr>
                  <tr>
                    <th>Email:</th>
                    <td>{saleLoaded?.email}</td>
                  </tr>
                  <tr>
                    <th>Teléfono:</th>
                    <td>
                      <div className="d-flex gap-1 align-items-center">
                        <img className='avatar-sm rounded-circle'
                          src={`${Global.WA_URL}/api/profile/${Global.APP_CORRELATIVE}/${saleLoadedPhone}`}
                          onError={(e) => {
                            e.target.onerror = null
                            e.target.src = `/api/admin/profile/thumbnail/undefined`;
                          }}
                          alt={saleLoaded?.name + ' ' + saleLoaded?.lastname} />
                        <div>
                          <span className='d-block'>{saleLoaded?.phone}</span>
                          <a href={`//wa.me/${saleLoadedPhone}`} target='_blank'>
                            <small>Abrir WhatsApp <i className='mdi mdi-arrow-top-right'></i></small>
                          </a>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th>Dirección:</th>
                    <td>{saleLoaded?.address} {saleLoaded?.number}
                      <small className='text-muted d-block'>{saleLoaded?.province ?? saleLoaded?.district}, {saleLoaded?.department}, {saleLoaded?.country} {saleLoaded?.zip_code && <>- {saleLoaded?.zip_code}</>}</small>
                    </td>
                  </tr>
                  {
                    saleLoaded?.reference &&
                    <tr>
                      <th>Referencia:</th>
                      <td>{saleLoaded?.reference}</td>
                    </tr>
                  }
                  {
                    saleLoaded?.comment &&
                    <tr>
                      <th>Comentario:</th>
                      <td>{saleLoaded?.comment}</td>
                    </tr>
                  }
                  {
                    (saleLoaded?.billing_type && saleLoaded?.billing_number) &&
                    <tr>
                      <th>Comprobante:</th>
                      <td>
                        <b className='d-block'>{saleLoaded.billing_type.toTitleCase()}</b>
                        <small>
                          <code className='me-1'>{saleLoaded.billing_type == 'boleta' ? 'DNI' : 'RUC'}</code>
                          <span>{saleLoaded?.billing_number}</span>
                        </small>
                      </td>
                    </tr>
                  }
                </tbody>
              </table>
              <button className='btn btn-xs btn-dark' type='button' copy={`Nombres: ${saleLoaded?.fullname}\nEmail: ${saleLoaded?.email}\nTeléfono: ${saleLoaded?.phone}\nDirección: ${saleLoaded?.address} ${saleLoaded?.number}\n_${saleLoaded?.province ?? saleLoaded?.district}, ${saleLoaded?.department}, ${saleLoaded?.country} ${saleLoaded?.zip_code ? `- ${saleLoaded?.zip_code}` : ''}_`}>
                <i className='mdi mdi-content-copy me-1'></i>
                Copiar
              </button>
            </div>
          </div>

          <div className="card">
            <div className="card-header p-2">
              <h5 className="card-title mb-0">Artículos</h5>
            </div>
            <div className="card-body p-2 table-responsive">
              <table className="table table-striped table-bordered table-sm table-hover mb-0">
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Colores</th>
                    <th>Precio</th>
                    <th>Cantidad</th>
                    <th>Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    saleLoaded?.details?.map((detail, index) => {
                      const quantity = (detail.quantity * 100) / 100
                      const totalPrice = detail.price * detail.quantity
                      return <tr key={index}>
                        <td>
                          <span className='d-block'>{detail.name}</span>
                          {
                            (detail.user_formula_id && detail.user_formula_id != saleLoaded.user_formula_id) &&
                            <Tippy content={<UserFormulaInfo name={saleLoaded?.name} details={saleLoaded?.details} formula={detail.user_formula} />} allowHTML interactive>
                              <small className='text-muted'>
                                <i className='mdi mdi-flask me-1'></i>
                                Fórmula secundaria
                              </small>
                            </Tippy>
                          }
                        </td>
                        <td>
                          {
                            detail?.colors?.map((color, index) => {
                              return <Tippy key={index} content={color.name}>
                                <i className='mdi mdi-circle' style={{
                                  color: color.hex,
                                  WebkitTextStroke: '1px #808080'
                                }}></i>
                              </Tippy>
                            })
                          }
                        </td>
                        <td align='right'>S/ {Number2Currency(detail.price)}</td>
                        <td align='center'>{quantity}</td>
                        <td align='right'>S/ {Number2Currency(totalPrice)}</td>
                      </tr>
                    })
                  }
                </tbody>
              </table>
            </div>
          </div>

          <div className="card">
            <div className="card-header p-2">
              <h5 className="card-title mb-0">Resumen</h5>
            </div>
            <div className="card-body p-2">
              <div className="d-flex justify-content-between">
                <b>Subtotal:</b>
                <span>S/ {Number2Currency(saleLoaded?.amount)}</span>
              </div>
              <div className="d-flex justify-content-between">
                <b>Envío:</b>
                <span>{
                  saleLoaded?.delivery === null ?
                    'Pago en destino' :
                    <>S/ {Number2Currency(saleLoaded?.delivery)}</>
                }
                </span>
              </div>
              {saleLoaded?.bundle && (
                <div className="d-flex justify-content-between">
                  <b>
                    Descuento x paquete:
                    <small className="d-block text-muted" style={{ fontWeight: "lighter" }}>
                      Elegiste {saleLoaded?.bundle?.name} (-{(saleLoaded?.bundle?.percentage * 10000) / 100}%)
                    </small>
                  </b>
                  <span>S/ -{Number2Currency(saleLoaded?.bundle_discount)}</span>
                </div>
              )}
              {saleLoaded?.renewal && (
                <div className="d-flex justify-content-between">
                  <b>
                    Subscripción:
                    <small className="d-block text-muted" style={{ fontWeight: "lighter" }}>
                      {saleLoaded?.renewal?.name} (-{(saleLoaded?.renewal?.percentage * 10000) / 100}%)
                    </small>
                  </b>
                  <span>S/ -{Number2Currency(saleLoaded?.renewal_discount)}</span>
                </div>
              )}
              {saleLoaded?.coupon && (
                <div className="d-flex justify-content-between">
                  <b>
                    Cupón aplicado:
                    <small className="d-block text-muted" style={{ fontWeight: "lighter" }}>
                      {saleLoaded?.coupon?.name} (-{(saleLoaded?.coupon?.amount * 100) / 100}%)
                    </small>
                  </b>
                  <span>S/ -{Number2Currency(saleLoaded?.coupon_discount)}</span>
                </div>
              )}
              <hr className='my-2' />
              <div className="d-flex justify-content-between">
                <b>Total:</b>
                <span>
                  <strong>S/ {Number2Currency(totalAmount)}</strong>
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card">
            <div className="card-header p-2">
              <h5 className="card-title mb-0">Formula principal</h5>
            </div>
            <div className="card-body p-2">
              <UserFormulaInfo name={saleLoaded?.name} details={saleLoaded?.details} formula={saleLoaded?.formula} />
            </div>
          </div>
          <div className="card">
            <div className="card-header p-2">
              <h5 className="card-title mb-0">Estado</h5>
            </div>
            <div className="card-body p-2">
              <div className="">
                <label htmlFor="statusSelect" className="form-label">Estado Actual</label>
                <select className="form-select" id="statusSelect" value={saleLoaded?.status_id} onChange={onStatusChange} disabled={!saleLoaded?.status?.reversible}>
                  {
                    statuses.map((status, index) => {
                      return <option key={index} value={status.id} data-confirm={!!status.confirm}>{status.name}</option>
                    })
                  }
                </select>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-header p-2">
              <h5 className="card-title mb-0">Cambios de Estado</h5>
            </div>
            <div className="card-body p-2 d-flex flex-column gap-1" style={{
              maxHeight: '300px',
              overflowY: 'auto'
            }}>
              {
                saleStatuses?.map((ss, index) => {
                  const fullname = (`${ss.user?.name || ''} ${ss.user?.lastname || ''}`).trim() || 'Automático'
                  return <article key={index} className="border py-1 px-2 ms-3" style={{
                    position: 'relative',
                    borderRadius: '16px 4px 4px 16px',
                    backgroundColor: ss.status.color ? `${ss.status.color}2e` : '#3333332e',
                  }}>
                    <i className='mdi mdi-circle left-2' style={{
                      color: ss.status.color || '#333',
                      position: 'absolute',
                      left: '-25px',
                      top: '50%',
                      transform: 'translateY(-50%)'
                    }}></i>
                    <b style={{ color: ss.status.color || '#333' }}>{ss?.status?.name}</b>
                    <small className='d-block text-truncate'>{fullname}</small>
                    <small className='d-block text-muted'>{moment(ss.created_at).format('YYYY-MM-DD HH:mm')}</small>
                  </article>
                })
              }
            </div>
          </div>
        </div>
      </div>
    </Modal>
    <Modal modalRef={modalRef} title='Nueva venta' size='lg' isStatic hideFooter>
      <form onSubmit={onModalSubmit}>
        <div className="row">
          <div className="col-md-6">
            <h4 className='mt-0'>Datos del cliente</h4>
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
              <div className="col-md-4 mb-2">
                <select name="" id="" className='form-select'>
                  {
                    phone_prefixes
                      .sort((a, b) => a.country.localeCompare(b.country))
                      .map((prefix, index) => {
                        return <option
                          key={index}
                          value={prefix.realCode}
                          data-code={prefix.beautyCode}
                          data-flag={prefix.flag}
                        >
                          {prefix.country}
                        </option>
                      })
                  }
                </select>
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
          </div>
          <div className="col-md-6">
            <div className="mb-3">
              <label className="form-label">Departamento *</label>
              <select
                className="form-select"
                value={sale.department}
                onChange={(e) => setSale(old => ({ ...old, department: e.target.value }))}
                required
              >
                <option value="">Seleccionar departamento</option>
                {Object.keys(places ?? {}).map((key) => (
                  <option key={key} value={key}>{places?.[key].name}</option>
                ))}
              </select>
            </div>
            {
              places?.[sale.department] && (
                <>
                  {
                    places?.[sale.department]?.items ?
                      <div className="mb-3">
                        <label className="form-label">Provincia *</label>
                        <select
                          className="form-select"
                          value={sale.province}
                          onChange={(e) => {
                            setSale(old => ({
                              ...old,
                              province: e.target.value,
                              district: '' // Resetear el distrito cuando cambia la provincia
                            }))
                          }}
                          required
                        >
                          <option value="">Seleccionar provincia</option>
                          {places?.[sale.department]?.items?.map((province) => (
                            <option key={province} value={province}>{province}</option>
                          ))}
                        </select>
                      </div>
                      : <div className="mb-3">
                        <label className="form-label">Seleccionar distrito *</label>
                        <input
                          type="text"
                          className="form-control"
                          value={sale.district}
                          onChange={(e) => setSale(old => ({ ...old, address: e.target.value }))}
                          required
                        />
                      </div>
                  }

                  <div className="mb-3">
                    <label className="form-label">Dirección *</label>
                    <input
                      type="text"
                      className="form-control"
                      value={sale.address}
                      onChange={(e) => setSale(old => ({ ...old, address: e.target.value }))}
                      required
                    />
                  </div>
                  <div className="">

                    <label className="form-label">Referencia</label>
                    <input
                      type="text"
                      className="form-control"
                      value={sale.reference}
                      onChange={(e) => setSale(old => ({ ...old, reference: e.target.value }))}
                    />
                  </div>
                </>
              )
            }
          </div>
          <div className="col-12">
            <h4>Items</h4>
            <div className="table-responsive">
              <table className="table table-centered">
                <thead>
                  <tr>
                    <th>Producto</th>
                    <th>Color</th>
                    <th>Precio</th>
                    <th>Cantidad</th>
                    <th>Total</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {saleItems.map((item, index) => (
                    <tr key={index}>
                      <td>
                        <select
                          className="form-select"
                          value={item.item_id}
                          onChange={(e) => {
                            const selectedItem = items.find(x => x.id == e.target.value)
                            updateItem(index, 'item_id', e.target.value)
                            updateItem(index, 'price', selectedItem?.price || 0)
                          }}
                          required
                        >
                          <option value="">Seleccionar producto</option>
                          {items.map(item => (
                            <option key={item.id} value={item.id}>{item.name}</option>
                          ))}
                        </select>
                      </td>
                      <td>
                        <select
                          className="form-select"
                          value={item.color_id}
                          onChange={(e) => updateItem(index, 'color_id', e.target.value)}
                          required
                        >
                          <option value="">Seleccionar color</option>
                          {items.find(x => x.id == item.item_id)?.colors.map(color => (
                            <option key={color.id} value={color.id}>{color.name}</option>
                          ))}
                        </select>
                      </td>
                      <td>
                        <input
                          type="number"
                          className="form-control"
                          value={item.price}
                          onChange={(e) => updateItem(index, 'price', e.target.value)}
                          required
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          className="form-control"
                          value={item.quantity}
                          onChange={(e) => updateItem(index, 'quantity', e.target.value)}
                          min="1"
                          required
                        />
                      </td>
                      <td>
                        <div className='text-nowrap'>
                          S/. {Number2Currency(item.price * item.quantity)}
                        </div>
                      </td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-danger btn-sm"
                          onClick={() => removeItem(index)}
                        >
                          <i className="mdi mdi-trash-can"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan="6">
                      <button type="button" className="btn btn-info btn-sm" onClick={addItem}>
                        <i className="mdi mdi-plus me-1"></i>
                        Agregar producto
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="4" className="text-end"><strong>Total:</strong></td>
                    <td>S/. {saleItems.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2)}</td>
                    <td></td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>

        <div className="text-end mt-3">
          <button type="submit" className="btn btn-primary">
            Crear Venta
          </button>
        </div>
      </form>
    </Modal>
  </>
  )
}

CreateReactScript((el, properties) => {

  createRoot(el).render(<BaseAdminto {...properties} title='Pedidos'>
    <Sales {...properties} />
  </BaseAdminto>);
})