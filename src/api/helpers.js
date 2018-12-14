import axios from 'axios'

const urlMap = {
  development: '/apis',
  production: '/apis'
}
const baseUrl = urlMap[process.env.NODE_ENV]

const ERR_OK = '0'
const USER_CHECK_INVALID = 1
const USER_EXISTS = '211'
const ARGS_INVALID = '201'
const FAIL = '1000'

export function postApi (apiRoute) {
  return function (params) {
    return axios({
      method: 'post',
      url: baseUrl + `/site/index?method=${apiRoute}&format=json`,
      data: params,
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
    }).then((res) => {
      const { errorCode, data, errorMessage } = res.data
      if (errorCode === ERR_OK) {
        return data
      }
      if (errorCode === FAIL) {
        let errorMessage = '操作频繁，请稍后再试'
        return { data, errorMessage }
      }
      if (errorCode == USER_EXISTS || ARGS_INVALID || USER_CHECK_INVALID) { //eslint-disable-line
        return { data, errorMessage }
      }
    }).catch(() => {

    })
  }
}
