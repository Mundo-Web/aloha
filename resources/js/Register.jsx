import { Link } from '@inertiajs/react'
import JSEncrypt from 'jsencrypt'
import React, { useEffect, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import ReCAPTCHA from 'react-google-recaptcha'
import Swal from 'sweetalert2'
import CreateReactScript from './Utils/CreateReactScript'
import Global from './Utils/Global'
import AuthRest from './actions/AuthRest'

const Register = ({ PUBLIC_RSA_KEY, RECAPTCHA_SITE_KEY }) => {

  document.title = `Registro | ${Global.APP_NAME}`

  const jsEncrypt = new JSEncrypt()
  jsEncrypt.setPublicKey(PUBLIC_RSA_KEY)

  // Estados
  const [loading, setLoading] = useState(true)
  const [captchaValue, setCaptchaValue] = useState(null)
  const [found, setFound] = useState(false)
  const [month, setMonth] = useState('01')
  const [days, setDays] = useState(31)

  // const documentTypeRef = useRef()
  // const documentNumberRef = useRef()
  const roleRef = useRef()
  const nameRef = useRef()
  const lastnameRef = useRef()
  const monthRef = useRef()
  const dayRef = useRef()
  const emailRef = useRef()
  const passwordRef = useRef()
  const confirmationRef = useRef()
  const notifyMeRef = useRef()

  useEffect(() => {
    setLoading(false)
  }, [null])

  const onRegisterSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)


    const password = passwordRef.current.value
    const confirmation = confirmationRef.current.value

    if (password != confirmation) {
      return Swal.fire({
        icon: 'warning',
        title: 'Error',
        text: 'Las contraseñas no coinciden',
        confirmButtonText: 'Ok'
      })
    }

    if (!captchaValue) return Swal.fire({
      icon: 'warning',
      title: 'Error',
      text: 'Por favor, complete el captcha',
      confirmButtonText: 'Ok'
    })

    // if (found) return Swal.fire({
    //   icon: 'warning',
    //   title: 'Error',
    //   text: 'El numero de documento ya esta registrado',
    //   confirmButtonText: 'Ok'
    // })

    const request = {
      name: nameRef.current.value,
      lastname: lastnameRef.current.value,
      month: monthRef.current.value,
      day: dayRef.current.value,
      email: emailRef.current.value,
      password: jsEncrypt.encrypt(password),
      confirmation: jsEncrypt.encrypt(confirmation),
      captcha: captchaValue,
      notify_me: notifyMeRef.current.checked
    }
    const result = await AuthRest.signup(request)
    if (!result) return setLoading(false)

    if (result) location.href = `./confirm-email/${result}`;
    setLoading(false)
  }

  const onDocumentTypeChange = (e) => {
    documentNumberRef.current.value = ''
    setFound(false)
  }

  useEffect(() => {
    const nro = document.querySelector(`#birth-month option[value="${month}"]`)?.getAttribute('data-days')
    setDays(nro)
  }, [month])

  const arrayDays = []
  for (let index = 1; index <= days; index++) {
    arrayDays.push(String(index).padStart(2, '0'))
  }

  return (<>
    <div className="account-pages mt-5 mb-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6 col-xl-4">
            <div className="text-center mb-4">
              <Link href="/" className='d-block mb-2'>
                <img src='/assets/img/logo-dark.svg' alt="" className="mx-auto" style={{ height: '40px' }} />
              </Link>
              <b className='mb-4' style={{ color: '#404040', fontSize: 'x-large' }}>¡Ahora puedes ser una Vuá lover!</b>
              <ul className='d-flex flex-wrap justify-content-center gap-x-4 gap-y-0 text-sm'>
                <li><i className='mdi mdi-circle-small'></i> Guarda tus fórmulas únicas</li>
                <li><i className='mdi mdi-circle-small'></i> Beneficios en tu cumpleaños</li>
                <li><i className='mdi mdi-circle-small'></i> Recibe las promos del mes primero</li>
              </ul>
            </div>
            <div className="card">
              <div className="card-body p-4">
                <div className="text-center mb-4 d-flex align-items-center justify-content-evenly gap-1 border p-1" style={{
                  borderRadius: '8px'
                }}>
                  <a href='/login' className='btn btn-white text-uppercase mt-0 font-bold w-100 d-block' style={{
                    border: 'none'
                  }}>INICIA SESIÓN</a>
                  <h4 className='btn btn-pink text-uppercase mt-0 font-bold w-100 d-block' style={{ backgroundColor: '#F1CACD', border: 'none' }}>REGÍSTRATE</h4>
                </div>
                <form onSubmit={onRegisterSubmit} className='row'>
                  <div className="col-sm-6 mb-2">
                    <label htmlFor="name" className="form-label">Nombres <b className="text-danger">*</b></label>
                    <input ref={nameRef} className="form-control" type="text" id="name" placeholder="Ingrese su nombre"
                      required />
                  </div>
                  <div className="col-sm-6 mb-2">
                    <label htmlFor="lastname" className="form-label">Apellidos <b className="text-danger">*</b></label>
                    <input ref={lastnameRef} className="form-control" type="text" id="lastname" placeholder="Ingrese sus apellidos"
                      required />
                  </div>
                  <div className="mb-2">
                    <label htmlFor="password" className="form-label">Cumpleaños <b className="text-danger">*</b></label>
                    <div className="input-group input-group-merge">
                      <div className="input-group-text" data-password="false">
                        <span className="mdi mdi-cake-variant"></span>
                      </div>
                      <select ref={monthRef} id='birth-month' className="form-select" onChange={(e) => setMonth(e.target.value)} defaultValue={month} value={month}>
                        <option value="01" data-days={31}>Enero</option>
                        <option value="02" data-days={29}>Febrero</option>
                        <option value="03" data-days={31}>Marzo</option>
                        <option value="04" data-days={30}>Abril</option>
                        <option value="05" data-days={31}>Mayo</option>
                        <option value="06" data-days={30}>Junio</option>
                        <option value="07" data-days={31}>Julio</option>
                        <option value="08" data-days={31}>Agosto</option>
                        <option value="09" data-days={30}>Septiembre</option>
                        <option value="10" data-days={31}>Octubre</option>
                        <option value="11" data-days={30}>Noviembre</option>
                        <option value="12" data-days={31}>Diciembre</option>
                      </select>
                      <select ref={dayRef} id="birth-day" className="form-select">
                        {
                          arrayDays.map((day) => {
                            return <option key={day} value={day}>{day}</option>
                          })
                        }
                      </select>
                    </div>
                  </div>
                  <div className="col-12 mb-2">
                    <label htmlFor="email" className="form-label">Correo electronico <b className="text-danger">*</b></label>
                    <input ref={emailRef} className="form-control" type="email" id="email" required
                      placeholder="Ingrese su correo electronico" />
                  </div>
                  <div className="col-sm-6 mb-2">
                    <label htmlFor="password" className="form-label">Contraseña <b className="text-danger">*</b></label>
                    <input ref={passwordRef} className="form-control" type="password" required id="password"
                      placeholder="Ingrese su contraseña" />
                  </div>
                  <div className="col-sm-6 mb-2">
                    <label htmlFor="confirmation" className="form-label">Confirmacion <b className="text-danger">*</b></label>
                    <input ref={confirmationRef} className="form-control" type="password" required id="confirmation"
                      placeholder="Confirme su contraseña" />
                  </div>
                  <div className="col-12 mb-3">
                    <div className="form-check mx-auto text-center">
                      <label className="form-check-label mb-0" style={{
                        userSelect: 'none',
                        cursor: 'pointer'
                      }}>
                        <input ref={notifyMeRef} type="checkbox" className="form-check-input" style={{
                          cursor: 'pointer'
                        }} />
                        Quiero recibir ofertas exclusivas y novedades de vuá
                      </label>
                    </div>
                  </div>
                  <ReCAPTCHA className='m-auto mb-3' sitekey={RECAPTCHA_SITE_KEY} onChange={setCaptchaValue} style={{ display: "block", width: 'max-content' }} />
                  <div className="mb-0 text-center d-grid">
                    <button className="btn btn-pink rounded-pill w-max mx-auto px-4" type="submit" disabled={loading} style={{ backgroundColor: '#A191B8', borderColor: '#A191B8' }}>
                      {loading ? <>
                        <i className='fa fa-spinner fa-spin'></i> VERIFICANDO
                      </> : '¡SER VUÁ LOVER!'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-12 text-center">
                <p className="">Ya tienes una cuenta? <Link href="/login"
                  className="ms-1"><b>Iniciar sesion</b></Link></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>)
};

CreateReactScript((el, properties) => {
  createRoot(el).render(<Register {...properties} />);
})