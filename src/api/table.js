import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/table/list',
    method: 'post',
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
