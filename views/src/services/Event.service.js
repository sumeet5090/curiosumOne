import Api from '@/services/Api'

let getMany = () => {
    return Api().get(`/event`)
  },
  getOne = (id = '') => {
    return Api().get(`/event/${id}`)
  },
  create = (body) => {
    return Api().post(`/event/create`, body)
  },
  update = (id, body) => {
    return Api().put(`/event/update/${id}`, body)
  },
  remove = (id) => {
    return Api().delete(`/event/delete/${id}`)
  }
export default {
  getMany,
  getOne,
  create,
  update,
  remove
}
