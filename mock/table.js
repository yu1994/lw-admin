import Mock from 'mockjs'
import { param2Obj } from '../src/utils'
// const data = Mock.mock({
//   'items|10': [{
//     id: '@id',
//     title: '@sentence(10, 20)',
//     'status|1': ['published', 'draft', 'deleted'],
//     author: 'name',
//     address: '杭州',
//     display_time: '@datetime',
//     pageviews: '@integer(300, 5000)'
//   }]
// });

const List = [];
const baseContent = '<p>我是测试数据我是测试数据</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>'
const image_uri = 'https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3'
for (let i = 0; i < 300; i++) {
  List.push(Mock.mock({
    id: '@increment',
    timestamp: +Mock.Random.date('T'),
    author: '@first',
    reviewer: '@first',
    address: '杭州',
    title: '@title(5, 10)',
    content_short: '我是测试数据',
    content: baseContent,
    forecast: '@float(0, 100, 2, 2)',
    importance: '@integer(1, 3)',
    'type|1': ['CN', 'US', 'JP', 'EU'],
    'status|1': ['published', 'draft', 'deleted'],
    display_time: '@datetime',
    comment_disabled: true,
    pageviews: '@integer(300, 5000)',
    image_uri,
    platforms: ['a-platform']
  }))
}
function response(config) {
  const { importance, type, title, page = 1, limit = 10, sort } = config.query
  let mockList = List.filter(item => {
    if (importance && item.importance !== +importance) return false
    if (type && item.type !== type) return false
    return !(title && item.title.indexOf(title) < 0)
  })

  if (sort === '-id') {
    mockList = mockList.reverse()
  }

  const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

  return {
    code: 20000,
    data: {
      total: mockList.length,
      items: pageList
    }
  }
}
export default [
  {
    url: '/table/list',
    type: 'post',
    response: config => {
      const items = List;
      return {
        code: 20000,
        data: {
          total: items.length,
          items: items
        }
      }
    }
  },
  {
    url: '/table/list/2',
    type: 'get',
    response: config => response(config)
  }
]
