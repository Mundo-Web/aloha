import React, { useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import BaseAdminto from '@Adminto/Base';
import CreateReactScript from '../Utils/CreateReactScript';
import Table from '../Components/Adminto/Table';
import Modal from '../Components/Modal';
import ReactAppend from '../Utils/ReactAppend';
import DxButton from '../Components/dx/DxButton';
import SwitchFormGroup from '@Adminto/form/SwitchFormGroup';
import Swal from 'sweetalert2';
import InputFormGroup from '@Adminto/form/InputFormGroup';
import { renderToString } from 'react-dom/server';
import UsersRest from '../Actions/Admin/UsersRest';
import PasswordFormGroup from '../Components/Adminto/form/PasswordFormGroup';

const usersRest = new UsersRest()

const Users = ({ }) => {
  const gridRef = useRef()
  const modalRef = useRef()
  const passwordModalRef = useRef()

  // Form elements ref
  const idRef = useRef()
  const nameRef = useRef()
  const lastnameRef = useRef()
  const emailRef = useRef()
  const phoneRef = useRef()

  // Password form elements ref
  const passwordIdRef = useRef()
  const passwordRef = useRef()

  const [isEditing, setIsEditing] = useState(false)

  const onModalOpen = (data) => {
    if (data?.id) setIsEditing(true)
    else setIsEditing(false)

    idRef.current.value = data?.id ?? ''
    nameRef.current.value = data?.name ?? ''
    lastnameRef.current.value = data?.lastname ?? ''
    emailRef.current.value = data?.email ?? ''
    phoneRef.current.value = data?.phone ?? ''

    $(modalRef.current).modal('show')
  }

  const onPasswordModalOpen = (data) => {
    setIsEditing(true)

    passwordIdRef.current.value = data.id
    passwordRef.current.value = ''

    $(passwordModalRef.current).modal('show');
  }

  const onModalSubmit = async (e) => {
    e.preventDefault()

    const request = {
      id: idRef.current.value || undefined,
      name: nameRef.current.value,
      lastname: lastnameRef.current.value,
      email: emailRef.current.value,
      phone: phoneRef.current.value,
    }

    const result = await usersRest.save(request)
    if (!result) return

    $(gridRef.current).dxDataGrid('instance').refresh()
    $(modalRef.current).modal('hide')
  }

  const onBooleanChange = async ({ id, field, value }) => {
    const result = await usersRest.boolean({ id, field, value })
    if (!result) return
    $(gridRef.current).dxDataGrid('instance').refresh()
  }

  const onDeleteClicked = async (id) => {
    const { isConfirmed } = await Swal.fire({
      title: 'Banear usuario',
      text: '¿Estas seguro de banear a este usuario? Esta accion no se puede revertir',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, banear',
      cancelButtonText: 'Cancelar'
    })
    if (!isConfirmed) return
    const result = await usersRest.delete(id)
    if (!result) return
    $(gridRef.current).dxDataGrid('instance').refresh()
  }

  const onPasswordModalSubmit = async (e) => {
    e.preventDefault()

    const request = {
      id: passwordIdRef.current.value,
      password: passwordRef.current.value,
    }

    const result = await usersRest.save(request)
    if (!result) return

    $(passwordModalRef.current).modal('hide')
  }

  return (<>
    <Table gridRef={gridRef} title='Usuarios' rest={usersRest}
      toolBar={(container) => {
        container.unshift({
          widget: 'dxButton', location: 'after',
          options: {
            icon: 'refresh',
            hint: 'Refrescar tabla',
            onClick: () => $(gridRef.current).dxDataGrid('instance').refresh()
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
          dataField: 'fullname',
          caption: 'Nombre completo',
          visible: false
        },
        {
          dataField: 'name',
          caption: 'Nombre',
        },
        {
          dataField: 'lastname',
          caption: 'Apellido',
        },
        {
          dataField: 'email',
          caption: 'Correo electronico',
        },
        {
          dataField: 'phone',
          caption: 'Celular',
        },
        {
          dataField: 'sales_count',
          caption: 'Pedidos',
          allowSorting: false,
          allowFiltering: false
        },
        {
          dataField: 'status',
          caption: 'Estado',
          dataType: 'boolean',
          cellTemplate: (container, { data }) => {
            $(container).empty()
            if (data.status == null) {
              container.html(renderToString(<i className='text-muted'>Baneado</i>))
            } else {
              ReactAppend(container, <SwitchFormGroup checked={data.status == 1} onChange={() => onBooleanChange({
                id: data.id,
                field: 'status',
                value: !data.status
              })} />)
            }
          }
        },
        {
          caption: 'Acciones',
          cellTemplate: (container, { data }) => {
            container.css('text-overflow', 'unset')
            if (data.status == null) return
            container.append(DxButton({
              className: 'btn btn-xs btn-soft-primary',
              title: 'Editar',
              icon: 'fa fa-pen',
              onClick: () => onModalOpen(data)
            }))
            container.append(DxButton({
              className: 'btn btn-xs btn-soft-dark',
              title: 'Cambiar contraseña',
              icon: 'fa fa-key',
              onClick: () => onPasswordModalOpen(data)
            }))
            container.append(DxButton({
              className: 'btn btn-xs btn-soft-danger',
              title: 'Banear usuario',
              icon: 'fas fa-ban',
              onClick: () => onDeleteClicked(data.id)
            }))
          },
          allowFiltering: false,
          allowExporting: false
        }
      ]} />
    <Modal modalRef={modalRef} title={isEditing ? 'Editar usuario' : 'Agregar usuario'} onSubmit={onModalSubmit} size='md'>
      <input ref={idRef} type='hidden' />
      <div className='row'>
        <InputFormGroup eRef={nameRef} label='Nombre' col='col-md-6' required />
        <InputFormGroup eRef={lastnameRef} label='Apellido' col='col-md-6' required />
        <InputFormGroup eRef={emailRef} label='Correo' required disabled />
        <InputFormGroup eRef={phoneRef} label='Celular' />
      </div>
    </Modal>

    <Modal modalRef={passwordModalRef} title='Cambio de contraseña' onSubmit={onPasswordModalSubmit} size='sm'>
      <input ref={passwordIdRef} type='hidden' />
      <PasswordFormGroup eRef={passwordRef} label='Contraseña nueva'/>
    </Modal>
  </>
  )
}

CreateReactScript((el, properties) => {

  createRoot(el).render(<BaseAdminto {...properties} title='Usuarios'>
    <Users {...properties} />
  </BaseAdminto>);
})