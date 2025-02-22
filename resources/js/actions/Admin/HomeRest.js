import { Fetch, Notify } from "sode-extend-react"

class HomeRest {
  getSales = async (param) => {
    try {
      const { status, result } = await Fetch(`/api/graph/sales/${param}`)
      if (!status) throw new Error(result?.message || 'Ocurrio un error inesperado')
      return result.data
    } catch (error) {
      Notify.add({
        icon: '/assets/img/favicon.png',
        title: 'Error',
        body: error.message,
        type: 'danger'
      })
      return []
    }
  }
}

export default HomeRest