import { useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import BaseAdminto from '@Adminto/Base';
import CreateReactScript from '../Utils/CreateReactScript';
import Table from '../Components/Adminto/Table';
import Modal from '../Components/Modal';
import ReactAppend from '../Utils/ReactAppend';
import DxButton from '../Components/dx/DxButton';
import TextareaFormGroup from '@Adminto/form/TextareaFormGroup';
import SwitchFormGroup from '@Adminto/form/SwitchFormGroup';
import Swal from 'sweetalert2';
import FeaturesRest from '../actions/Admin/FeaturesRest.js';
import Tippy from '@tippyjs/react';
import SortByAfterField from '../Utils/SortByAfterField.js';

import '../../css/features.css'

const featuresRest = new FeaturesRest()

const Features = ({ features: featuresDB }) => {
  const gridRef = useRef()
  const modalRef = useRef()

  // Form elements ref
  const idRef = useRef()
  const nameRef = useRef()
  const aliasRef = useRef()
  const descriptionRef = useRef()

  const [isEditing, setIsEditing] = useState(false)
  const [featurePosition, setFeaturePosition] = useState('first')
  const [features, setFeatures] = useState(SortByAfterField(featuresDB, 'after_feature'))

  const onModalOpen = (data) => {
    if (data?.id) setIsEditing(true)
    else setIsEditing(false)

    idRef.current.value = data?.id ?? ''
    nameRef.current.value = data?.name ?? ''
    aliasRef.current.value = data?.alias ?? ''
    descriptionRef.current.value = data?.description ?? ''

    $(modalRef.current).modal('show')
  }

  const onModalSubmit = async (e) => {
    e.preventDefault()

    const request = {
      id: idRef.current.value || undefined,
      name: nameRef.current.value,
      alias: aliasRef.current.value,
      description: descriptionRef.current.value
    }

    if (!isEditing && featurePosition == 'last') {
      request.after_feature = features[features.length - 1]?.id ?? null
    }

    const result = await featuresRest.save(request)
    if (!result) return

    setFeatures(SortByAfterField(result.data, 'after_feature'))

    $(modalRef.current).modal('hide')
  }

  const onVisibleChange = async ({ id, value }) => {
    const result = await featuresRest.boolean({ id, field: 'visible', value })
    if (!result) return

    // Update the features state with the new visibility value
    setFeatures(features.map(feature =>
      feature.id === id ? { ...feature, visible: value } : feature
    ))
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
    const result = await featuresRest.delete(id)
    if (!result) return

    // Update features state by filtering out the deleted item
    setFeatures(SortByAfterField(result, 'after_feature'))
  }

  return (<>
    <div className='row justify-content-center'>
      <div className='col-12'>
        <Tippy content='Agregar característica'>
          <button className='btn btn-primary btn-sm d-block mx-auto mb-2' onClick={() => {
            setFeaturePosition('first')
            onModalOpen()
          }}>
            <i className='mdi mdi-plus'></i>
            Agregar
          </button>
        </Tippy>
      </div>
      <div className='col-xl-4 col-lg-6 col-md-8 col-sm-10 col-12 mb-2'>
        <div className='d-flex flex-column gap-2'>
          {
            features.map((feature, index) => {
              return <div key={index} className='bg-white p-2 rounded position-relative'>
                <div className='d-flex gap-2 align-items-center' style={{ opacity: feature.visible ? 1 : 0.45 }}>
                  <i className='fa fa-grip-vertical'></i>
                  <div>
                    {/* <small className='d-block'>ID: {feature.id}</small>
                    <small className='d-block'>After: {feature.after_feature}</small> */}
                    <b className='d-block' style={{ textDecoration: !feature.visible ? 'line-through' : 'none' }}>
                      {feature.name}
                    </b>
                    <small
                      className='d-block text-muted'
                      style={{
                        marginTop: '-2px',
                        textDecoration: !feature.visible ? 'line-through' : 'none'
                      }}
                    >
                      {feature.description}
                    </small>
                  </div>
                </div>
                <div className='position-absolute end-0 me-2' style={{ opacity: 0, transition: '0.2s', top: '50%', transform: 'translateY(-50%)' }}>
                  <Tippy content={feature.visible ? 'Ocultar' : 'Mostrar'}>
                    <button
                      className={`btn btn-link ${feature.visible ? 'text-secondary' : 'text-success'} btn-sm p-0 me-2`}
                      onClick={() => onVisibleChange({
                        id: feature.id,
                        value: feature.visible != 1
                      })}
                    >
                      <i className={`mdi ${feature.visible ? 'mdi-eye-off' : 'mdi-eye'}`}></i>
                    </button>
                  </Tippy>
                  <button
                    className='btn btn-link text-primary btn-sm p-0 me-2'
                    onClick={() => onModalOpen(feature)}
                  >
                    <i className='mdi mdi-pencil'></i>
                  </button>
                  <button
                    className='btn btn-link text-danger btn-sm p-0'
                    onClick={() => onDeleteClicked(feature.id)}
                  >
                    <i className='mdi mdi-delete'></i>
                  </button>
                </div>
              </div>
            })
          }
        </div>
      </div>
      {
        features.length > 0 &&
        <div className='col-12'>
          <Tippy content='Agregar característica'>
            <button className='btn btn-primary btn-sm d-block mx-auto mb-2' onClick={() => {
              setFeaturePosition('last')
              onModalOpen()
            }}>
              <i className='mdi mdi-plus'></i>
              Agregar
            </button>
          </Tippy>
        </div>
      }
    </div>
    <Modal modalRef={modalRef} title={isEditing ? 'Editar servicio' : 'Agregar servicio'} onSubmit={onModalSubmit} size='sm'>
      <div className='row' id='principal-container'>
        <input ref={idRef} type='hidden' />
        <TextareaFormGroup eRef={nameRef} label='Característica' rows={2} required />
        <TextareaFormGroup eRef={aliasRef} label='Alias' rows={2} />
        <TextareaFormGroup eRef={descriptionRef} label='Descripción' rows={3} />
      </div>
    </Modal>
  </>
  )
}

CreateReactScript((el, properties) => {
  createRoot(el).render(<BaseAdminto {...properties} title='Características'>
    <Features {...properties} />
  </BaseAdminto>);
})