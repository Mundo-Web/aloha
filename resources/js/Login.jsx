import { createRoot } from 'react-dom/client'
import React, { useEffect, useRef, useState } from 'react'
import JSEncrypt from 'jsencrypt'
import CreateReactScript from './Utils/CreateReactScript'
import AuthRest from './actions/AuthRest'
import { Link } from '@inertiajs/react'
import Swal from 'sweetalert2'
import { GET } from 'sode-extend-react'
import Global from './Utils/Global'

import BackgroundHome from './Components/Tailwind/images/bg-home.png'
import IconAloha from './Components/Tailwind/images/icon-aloha.svg'

const Login = ({ }) => {

  document.title = `Login | ${Global.APP_NAME}`

  const jsEncrypt = new JSEncrypt()
  jsEncrypt.setPublicKey(Global.PUBLIC_RSA_KEY)

  // Estados
  const [loading, setLoading] = useState(true)

  const emailRef = useRef()
  const passwordRef = useRef()
  const rememberRef = useRef()

  useEffect(() => {
    if (GET.message) Swal.fire({
      icon: 'info',
      title: 'Mensaje',
      text: GET.message,
      showConfirmButton: false,
      timer: 3000
    })
    if (GET.service) history.pushState(null, null, `/login?service=${GET.service}`)
    else history.pushState(null, null, '/login')
  }, [null])

  const onLoginSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    const email = emailRef.current.value
    const password = passwordRef.current.value

    const request = {
      email: jsEncrypt.encrypt(email),
      password: jsEncrypt.encrypt(password)
    }
    const result = await AuthRest.login(request)

    if (!result) return setLoading(false)

    location.reload();
  }

  return (
    <>
      <div className="account-pages my-5">
        <img
          src={BackgroundHome}
          style={{
            position: 'absolute',
            height: '100%',
            width: '100%',
            top: 0,
            objectFit: 'cover',
            objectPosition: 'bottom',
            zIndex: 0,
            userSelect: 'none'
          }}
          alt='Fondo AlohaPeru'
        />
        <div className="container">

          <div className="row justify-content-center">
            <div className="col-md-8 col-lg-6 col-xl-4" style={{ zIndex: 20 }}>
              <div className="text-center mb-4">
                <Link href="/" className='d-block mb-2'>
                  <img src={IconAloha} alt="" className="mx-auto" style={{ height: '40px' }} />
                </Link>
                <b className='mb-4' style={{ color: '#ffffff', fontSize: 'x-large' }}>AlohaPeru</b>
              </div>
              <div className="card" style={{
                  boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.1)',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)'
                }}>
                <div className="card-body p-4">
                  <div className="text-center mb-4 d-flex align-items-center justify-content-evenly gap-1 border p-1" style={{
                    borderRadius: '8px'
                  }}>
                    <h4 className='btn btn-pink text-uppercase mt-0 font-bold w-100 d-block' style={{ backgroundColor: '#F1CACD', border: 'none' }}>INICIA SESIÓN</h4>
                    <a href='/register' className='btn btn-white text-uppercase mt-0 font-bold w-100 d-block' style={{
                      border: 'none'
                    }}>REGÍSTRATE</a>
                  </div>
                  <form onSubmit={onLoginSubmit} autoComplete='off'>
                    <div className="mb-3">
                      <label htmlFor="email" className="form-label">Correo o Usuario</label>
                      <input ref={emailRef} className="form-control" type="email" id="email" required
                        placeholder="Ingrese su correo o usuario" />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="password" className="form-label">Contraseña</label>
                      <input ref={passwordRef} className="form-control" type="password" required id="password"
                        placeholder="Ingrese su contraseña" />
                    </div>
                    {/* <div className="mb-3">
                      <div className="form-check">
                        <input ref={rememberRef} type="checkbox" className="form-check-input" id="checkbox-signin" defaultChecked style={{ cursor: 'pointer' }} />
                        <label className="form-check-label" htmlFor="checkbox-signin" style={{ cursor: 'pointer' }}>Recuerdame</label>
                      </div>
                    </div> */}
                    <div className="mb-3 d-grid text-center">
                      <button className="btn btn-pink rounded-pill w-max mx-auto px-4" type="submit" style={{ backgroundColor: '#A191B8', borderColor: '#A191B8' }}> INGRESAR </button>
                    </div>
                  </form>
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-12 text-center">
                  {/* <p> <Link href="/recovery" className="text-muted ms-1"><i
                    className="fa fa-lock me-1"></i>Olvidaste tu contraseña?</Link></p> */}
                  <p className="">No tienes una cuenta aun? <Link href="/register"
                    className=" ms-1"><b>Registrate</b></Link></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
};

CreateReactScript((el, properties) => {
  createRoot(el).render(<Login {...properties} />);
})