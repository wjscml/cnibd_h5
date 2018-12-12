import axios from 'axios'

const service = axios.create({
  baseURL: ''
})

export function getApi (apiRoute) {
  return service({
    url: `https://www.cnibd.com/h5${apiRoute}`,
    method: 'get'
  })
}

export function postApi (apiRoute, param) {
  return service({
    method: 'post',
    url: `https://api.cnibd.com/site/index?method=${apiRoute}&format=json`,
    data: param,
    headers: {
      'Content-type': 'application/x-www-form-urlencoded'
    },
    transformRequest: [function (data) {
      let ret = ''
      for (let it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }
      return ret
    }]
  })
}
