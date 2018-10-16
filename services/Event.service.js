import axios from '@/plugins/axios'

let getMany = () => {
  return axios.get(`/event`)
}
let getOne = (id = '') => {
  return axios.get(`/event/${id}`)
}
let create = (body) => {
  return axios.post(`/event/create`, body)
}
let update = (id, body) => {
  return axios.put(`/event/update/${id}`, body)
}
let remove = (id) => {
  return axios.delete(`/event/delete/${id}`)
}

export default {
  getMany,
  getOne,
  create,
  update,
  remove
}
