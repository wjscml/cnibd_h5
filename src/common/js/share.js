import Axios from 'axios'

export function queryJsConfig (param, callback) {
  Axios.post('/wechat/jsconfig', param).then(obj => {
    callback(null, obj)
  }).catch(err => {
    callback(err)
  })
}
