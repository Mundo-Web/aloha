import React, { useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import BaseAdminto from '@Adminto/Base';
import CreateReactScript from '../Utils/CreateReactScript';
import Table from '../Components/Adminto/Table';
import Modal from '../Components/Modal';
import InputFormGroup from '../Components/Adminto/form/InputFormGroup';
import ReactAppend from '../Utils/ReactAppend';
import DxButton from '../Components/dx/DxButton';
import TextareaFormGroup from '@Adminto/form/TextareaFormGroup';
import SwitchFormGroup from '@Adminto/form/SwitchFormGroup';
import Swal from 'sweetalert2';
import ServicesRest from '../actions/Admin/ServicesRest.js';
import Tippy from '@tippyjs/react';

const servicesRest = new ServicesRest()

const Services = ({ }) => {
  const gridRef = useRef()
  const modalRef = useRef()

  // Form elements ref
  const idRef = useRef()
  const nameRef = useRef()
  const descriptionRef = useRef()
  const priceRef = useRef()

  const [isEditing, setIsEditing] = useState(false)
  const [attributes, setAttributes] = useState([])

  const onModalOpen = (data) => {
    if (data?.id) setIsEditing(true)
    else setIsEditing(false)

    idRef.current.value = data?.id ?? ''
    nameRef.current.value = data?.name ?? ''
    descriptionRef.current.value = data?.description ?? ''
    priceRef.current.value = data?.price ?? ''

    const serviceAttrs = data?.attributes ?? []
    setAttributes(serviceAttrs.length == 0 ? [''] : serviceAttrs)

    $(modalRef.current).modal('show')
  }

  const onModalSubmit = async (e) => {
    e.preventDefault()

    const request = {
      id: idRef.current.value || undefined,
      name: nameRef.current.value,
      price: priceRef.current.value,
      description: descriptionRef.current.value,
      attributes: attributes.filter(Boolean)
    }

    const result = await servicesRest.save(request)
    if (!result) return

    $(gridRef.current).dxDataGrid('instance').refresh()
    $(modalRef.current).modal('hide')
  }

  const onVisibleChange = async ({ id, value }) => {
    const result = await servicesRest.boolean({ id, field: 'visible', value })
    if (!result) return
    $(gridRef.current).dxDataGrid('instance').refresh()
  }

  const onDeleteClicked = async (id) => {
    const { isConfirmed } = await Swal.fire({
      title: 'Eliminar item',
      text: '¿Estás seguro de eliminar este item?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    })
    if (!isConfirmed) return
    const result = await servicesRest.delete(id)
    if (!result) return
    $(gridRef.current).dxDataGrid('instance').refresh()
  }

  return (<>
    <Table gridRef={gridRef} title='Servicios' rest={servicesRest}
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
            text: 'Nuevo registro',
            hint: 'Nuevo registro',
            onClick: () => onModalOpen()
          }
        });
      }}
      columns={[
        {
          dataField: 'id',
          caption: 'ID',
          visible: false
        },
        {
          dataField: 'name',
          caption: 'Nombre',
          cellTemplate: (container, { data }) => {
            container.css('text-overflow', 'unset')
            ReactAppend(container, <p className='mb-0' style={{ width: '100%' }}>
              <b className='d-block'>{data.name}</b>
              <small className='text-wrap text-muted' style={{
                overflow: 'hidden',
                display: '-webkit-box',
                WebkitBoxOrient: 'vertical',
                WebkitLineClamp: 2,
              }}>{data.description}</small>
            </p>)
          }
        },
        {
          dataField: 'price',
          caption: 'Precio',
          dataType: 'number',
          width: '100px',
          cellTemplate: (container, { data }) => {
            container.text(`S/.${Number(data.price).toFixed(2)}`)
          }
        },
        {
          dataField: 'visible',
          caption: 'Visible',
          dataType: 'boolean',
          width: '120px',
          cellTemplate: (container, { data }) => {
            ReactAppend(container, <SwitchFormGroup checked={data.visible} onChange={(e) => onVisibleChange({ id: data.id, value: e.target.checked })} />)
          }
        },
        {
          caption: 'Acciones',
          width: '120px',
          cellTemplate: (container, { data }) => {
            container.css('text-overflow', 'unset')
            container.append(DxButton({
              className: 'btn btn-xs btn-soft-primary',
              title: 'Editar',
              icon: 'fa fa-pen',
              onClick: () => onModalOpen(data)
            }))
            container.append(DxButton({
              className: 'btn btn-xs btn-soft-danger',
              title: 'Eliminar',
              icon: 'fa fa-trash',
              onClick: () => onDeleteClicked(data.id)
            }))
          },
          allowFiltering: false,
          allowExporting: false
        }
      ]} />
    <Modal modalRef={modalRef} title={isEditing ? 'Editar servicio' : 'Agregar servicio'} onSubmit={onModalSubmit} size='lg' onClose={() => {
      setAttributes([])
      console.log('Modal cerrado')
    }}>
      <div className='row' id='principal-container'>
        <input ref={idRef} type='hidden' />
        <div className="col-md-6" style={{ height: 'max-content' }}>
          <InputFormGroup eRef={nameRef} label='Nombre' required />
          <TextareaFormGroup eRef={descriptionRef} label='Descripción' rows={3} />
          <InputFormGroup eRef={priceRef} label='Precio' type='number' step={0.01} required />
        </div>
        <div className='col-md-6' style={{ height: 'max-content' }}>
          <div className="d-flex justify-content-between">
            <label htmlFor="attributes-btn" className='form-label'>Atributos</label>
            <Tippy content='Agregar atributo'>
              <span
                id='attributes-btn'
                className="cursor-pointer"
                onClick={() => {
                  setAttributes([...attributes, ''])
                  setTimeout(() => {
                    const inputs = document.querySelectorAll('.sortable-attributes .form-control');
                    inputs[inputs.length - 1]?.focus();
                  }, 0);
                }}
              >
                <i className="mdi mdi-plus me-1"></i>
                Agregar
              </span>
            </Tippy>
          </div>
          <div className="sortable-attributes border p-2 rounded d-flex flex-column gap-1" style={{
            height: 'calc(100% - 40px)',
            minHeight: '200px',
          }}>
            {attributes.map((item, index) => (
              <div
                key={index}
                class="input-group"
                draggable
                onDragStart={(e) => e.dataTransfer.setData('index', index)}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  const dragIndex = parseInt(e.dataTransfer.getData('index'));
                  const dropIndex = index;

                  const newAttributes = [...attributes];
                  const [removed] = newAttributes.splice(dragIndex, 1);
                  newAttributes.splice(dropIndex, 0, removed);

                  setAttributes(newAttributes);
                }}>
                <span class="input-group-text" style={{ cursor: 'grab' }}>
                  <i className='fa fa-grip-vertical'></i>
                </span>
                <input
                  type="text"
                  class="form-control"
                  placeholder={`Atributo ${index + 1}`}
                  value={item}
                  onChange={(e) => {
                    const newAttributes = [...attributes];
                    newAttributes[index] = e.target.value;
                    setAttributes(newAttributes);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      const newAttributes = [...attributes, ''];
                      setAttributes(newAttributes);
                      // Use setTimeout to wait for the new input to be rendered
                      setTimeout(() => {
                        const inputs = document.querySelectorAll('.sortable-attributes .form-control');
                        inputs[inputs.length - 1]?.focus();
                      }, 0);
                    }
                  }}
                  onPaste={(e) => {
                    e.preventDefault();
                    const pastedText = e.clipboardData.getData('text');
                    const pastedLines = pastedText.split('\n').filter(line => line.trim());
                    
                    // Replace current attribute with first line
                    const newAttributes = [...attributes];
                    newAttributes[index] = pastedLines[0];
                    
                    // Add remaining lines as new attributes
                    if (pastedLines.length > 1) {
                      newAttributes.splice(index + 1, 0, ...pastedLines.slice(1));
                    }
                    
                    setAttributes(newAttributes);
                  }}
                />
                <Tippy content="Eliminar atributo">
                  <button className='input-group-button btn btn-dark' type='button' onClick={() => {
                    const newAttributes = attributes.filter((_, i) => i !== index);
                    setAttributes(newAttributes);
                  }}>
                    <i className='fa fa-times'></i>
                  </button>
                </Tippy>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  </>
  )
}

CreateReactScript((el, properties) => {
  createRoot(el).render(<BaseAdminto {...properties} title='Servicios'>
    <Services {...properties} />
  </BaseAdminto>);
})