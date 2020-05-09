import { getAction } from '../api'
import packTable from '../components/PackTable'
import packSearch from '../components/PackSearch'
import PackPagination from '../components/PackPagination'

export default {
  components: { packTable, packSearch, PackPagination },
  data() {
    return {
      queryParam: {},
      initLoadList: true,
      pagination: {
        page: 1,
        limit: 10,
        total: 0
      },
      tableDataSource: [],
      tableLoading: false,
      searchTypeData: []
    }
  },
  watch: {
    searchTypeData: {
      handler(news) {
        console.log(news)
      },
      deep: true
    }
  },
  created() {
    if (this.initLoadList) {
      this.onLoadList()
    }
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  methods: {
    /** 表格数据加载*/
    onLoadList(arg = 1) {
      if (!this.url.list) {
        this.$message({
          message: '请设置url.list属性!',
          type: 'warning'
        })
        return false
      }
      if (arg === 1) {
        this.pagination.page = 1
      }
      this.tableLoading = true
      getAction(this.url.list, Object.assign({}, this.queryParam, this.pagination)).then((response) => {
        this.tableDataSource = response.data.items
        this.pagination.total = response.data.total
      }).catch(() => { this.tableDataSource = [] }).finally(() => { this.tableLoading = false })
    },

    /** 表格 页码切换 */
    onTableChange(value) {
      const { limit, page } = value
      this.pagination.page = page
      this.pagination.limit = limit
      this.onLoadList(page)
    },

    /** 表格数据搜索 */
    onSearch(filter) {
      this.queryParam = filter
      this.onLoadList()
    }
  }
}
