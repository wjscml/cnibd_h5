import request from '../request'
import requestcopy from '../requestcopy'

export function getApi (apiRoute) {
  return requestcopy({
    url: apiRoute,
    method: 'get'
  })
}

export function postApi (apiRoute, param) {
  return request({
    method: 'post',
    url: apiRoute,
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
