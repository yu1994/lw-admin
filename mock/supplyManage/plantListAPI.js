import { mockTableData } from '../mock-data'

export default [
  {
    url: '/supplyManage/plantList/table',
    type: 'get',
    response: config => mockTableData(config)
  }
]
