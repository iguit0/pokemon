import axios from 'axios'

const baseURL = process.env.REACT_APP_API_URL || ''

const DEFAULT_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Content-Type': 'application/json',
}

const api = axios.create({
  baseURL,
  headers: DEFAULT_HEADERS,
})

export default api
