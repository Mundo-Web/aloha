import { Cookies, Fetch, FetchParams, Notify } from "sode-extend-react"

class AuthRest {
  static login = async (request) => {
    try {

      const { status, result } = await Fetch('/api/login', {
        method: 'POST',
        body: JSON.stringify(request)
      })
      if (!status) throw new Error(result?.message || 'Error al iniciar sesion')

      Notify.add({
        icon: '/assets/img/favicon.png',
        title: 'Operacion correcta',
        body: 'Se inicio sesion correctamente'
      })

      FetchParams.headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-Xsrf-Token': decodeURIComponent(Cookies.get('XSRF-TOKEN'))
      }

      return result
    } catch (error) {
      Notify.add({
        icon: '/assets/img/favicon.png',
        title: 'Error',
        body: error.message,
        type: 'danger'
      })
      return false
    }
  }

  static signup = async (request) => {
    try {

      const { status, result } = await Fetch('/api/signup', {
        method: 'POST',
        body: JSON.stringify(request)
      })
      if (!status) throw new Error(result?.message || 'Error al registrar el usuario')

      Notify.add({
        icon: '/assets/img/favicon.png',
        title: 'Operacion correcta',
        body: 'Se registro el usuario correctamente'
      })

      FetchParams.headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-Xsrf-Token': decodeURIComponent(Cookies.get('XSRF-TOKEN'))
      }

      return result.data
    } catch (error) {
      Notify.add({
        icon: '/assets/img/favicon.png',
        title: 'Error',
        body: error.message,
        type: 'danger'
      })
      return null
    }
  }

  static verifyCode = async (request) => {
    try {

      const { status, result } = await Fetch('/api/verify-code', {
        method: 'POST',
        body: JSON.stringify(request)
      })
      if (!status) throw new Error(result?.message || 'Error al registrar el usuario')

      Notify.add({
        icon: '/assets/img/favicon.png',
        title: 'Operacion correcta',
        body: 'Se registro el usuario correctamente'
      })

      FetchParams.headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-Xsrf-Token': decodeURIComponent(Cookies.get('XSRF-TOKEN'))
      }

      return result
    } catch (error) {
      Notify.add({
        icon: '/assets/img/favicon.png',
        title: 'Error',
        body: error.message,
        type: 'danger'
      })
      return null
    }
  }
}

export default AuthRest