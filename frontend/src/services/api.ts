
import axios from 'axios'
import { BASE_URL } from './authService'



export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export { BASE_URL }
