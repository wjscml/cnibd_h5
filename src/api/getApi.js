import request from '../request'

export function getApi (apiRoute) {
  return request({
    url: apiRoute,
    methods: 'get'
  })
}
