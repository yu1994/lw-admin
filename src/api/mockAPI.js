import request from '@/utils/request'

export function orderStatusAPI(query) {
  return request({
    url: '/orderManage/orderList/orderStatus',
    method: 'get',
    params: query
  })
}
