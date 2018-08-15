import axios from 'axios'

const service = axios.create({
  baseURL: 'https://www.cnibd.com/h5'
})

export default service
