import { Fetch, Notify } from "sode-extend-react";
import BasicRest from "../BasicRest";

class SalesRest extends BasicRest {
  path = 'admin/sales'

  pos = async (request) => {
    try {
      const { status, result } = await Fetch(`/api/${this.path}/pos`, {
        method: 'POST',
        body: JSON.stringify(request)
      })

      if (!status) throw new Error(result?.message || 'Ocurrio un error inesperado')

      Notify.add({
        icon: '/assets/img/favicon.png',
        title: 'Correcto',
        body: result.message,
        type: 'success'
      })
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

export default SalesRest