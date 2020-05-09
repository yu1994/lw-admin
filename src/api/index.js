import request from '@/utils/request'

export function getAction(url = '', params) {
  return request({
    url,
    params
  })
}

export function getList2(query) {
  return request({
    url: '/table/list/2',
    method: 'get',
    params: query
  })
}
