
const tokens = {
  admin: {
    token: 'admin-token'
  },
  editor: {
    token: 'editor-token'
  }
}

const users = {
  'admin-token': {
    roles: ['admin'],
    introduction: 'I am a super administrator',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Super Admin'
  },
  'editor-token': {
    roles: ['editor'],
    introduction: 'I am an editor',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Normal Editor'
  }
}

export default [
  // user login
  {
    url: '/user/login',
    type: 'post',
    response: config => {
      const { username } = config.body
      const token = tokens[username]

      // mock error
      if (!token) {
        return {
          code: 60204,
          message: 'Account and password are incorrect.'
        }
      }

      return {
        code: 20000,
        data: token
      }
    }
  },

  // get user info
  {
    url: '/user/info\.*',
    type: 'get',
    response: config => {
      const { token } = config.query
      const info = users[token]

      // mock error
      if (!info) {
        return {
          code: 50008,
          message: 'Login failed, unable to get user details.'
        }
      }

      return {
        code: 20000,
        data: info
      }
    }
  },

  // user logout
  {
    url: '/user/logout',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },
  {
    url: '/user/generateRoutes',
    type: 'get',
    response: config => {
      const { token } = config.query
      const adminData = [
        {
          path: '/example',
          component: 'layout',
          redirect: '/example/table',
          name: 'example',
          meta: { title: 'example', icon: 'example' },
          children: [
            {
              path: 'table',
              name: 'table',
              component: 'table',
              meta: { title: 'add', icon: 'table', permission: ['Table-delete', 'Table-editor'] }
            },
            {
              path: 'tree',
              name: 'tree',
              component: 'tree',
              meta: { title: 'tree', icon: 'tree' }
            }
          ]
        }, {
          path: '/supplyManage',
          component: 'layout',
          redirect: '/supplyManage/plantList',
          name: 'supplyManage',
          meta: { title: 'supplyManage', icon: 'example' },
          children: [
            {
              path: 'plantList',
              name: 'plantList',
              component: 'supplyManage/plantList',
              meta: { title: 'plantList', icon: 'table', permission: ['Table-delete', 'Table-editor'] }
            },
            {
              path: 'productionsConfig',
              name: 'productionsConfig',
              component: 'supplyManage/productionsConfig',
              meta: { title: 'productionsConfig', icon: 'table', permission: ['Table-delete', 'Table-editor'] }
            }
          ]
        }, {
          path: '/orderManage',
          component: 'layout',
          redirect: '/orderManage/orderList',
          name: 'orderManage',
          meta: { title: 'orderManage', icon: 'example' },
          children: [
            {
              path: 'orderList',
              name: 'orderList',
              component: 'orderManage/orderList',
              meta: { title: 'orderList', icon: 'table', permission: ['Table-delete', 'Table-editor'] }
            },
            {
              path: 'issueOrder',
              name: 'issueOrder',
              component: 'orderManage/issueOrder',
              meta: { title: 'issueOrder', icon: 'table', permission: ['Table-delete', 'Table-editor'] }
            }
          ]
        }
      ]
      const editorData = [
        {
          path: '/example',
          component: 'layout',
          redirect: '/example/table',
          name: 'Example',
          meta: { title: 'Example', icon: 'example' },
          children: [
            {
              path: 'table',
              name: 'table',
              component: 'table',
              meta: { title: '$t("title333")', icon: 'table', permission: ['Table-editor'] }
            }
          ]
        }
      ]
      if (token.indexOf('admin') > -1) {
        return {
          code: 20000,
          data: adminData
        }
      } else {
        return {
          code: 20000,
          data: editorData
        }
      }
    }
  }
]
