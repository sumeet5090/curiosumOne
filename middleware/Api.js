import axios from '@/plugins/axios'
import store from '@/store/'

export default () => {
  return axios.create({
    baseURL: `http://localhost:3000`,

  })
}
