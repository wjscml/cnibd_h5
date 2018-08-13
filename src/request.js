import axios from 'axios'

const service = axios.create({
  baseURL: 'https://www.cnibd.com/',
  timeout: 8000
})

export default service
