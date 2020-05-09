import { mockTableData } from '../mock-data'
export default [
  {
    url: '/orderManage/orderList/table',
    type: 'get',
    response: config => mockTableData(config)
  },

  {
    url: '/orderManage/orderList/orderStatus',
    type: 'get',
    response: _ => {
      return {
        code: 20000,
        data: [
          {
            value: '选项1',
            label: '黄金糕'
          }, {
            value: '选项2',
            label: '双皮奶'
          }
        ]
      }
    }
  }
]
