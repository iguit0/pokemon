import axios from 'axios'

const baseURL = process.env.REACT_APP_API_URL

const api = axios.create({
  baseURL,
})

api.defaults.headers.common.Accept = 'application/json'
api.defaults.headers.common['Content-Type'] = 'application/json'
api.defaults.headers.common.credentials = 'include'

export default api
