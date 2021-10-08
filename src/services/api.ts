import axios, { AxiosInstance } from 'axios'

const HOST = process.env.REACT_APP_API_URL

const DEFAULT_HEADERS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json'
}

const API: AxiosInstance = axios.create({
    baseURL: HOST,
    headers: DEFAULT_HEADERS
})

export default API
