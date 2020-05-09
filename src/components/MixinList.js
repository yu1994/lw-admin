import packTable from './PackTable'
import packSearch from './PackSearch/PackSearch'
import waves from '@/directive/waves'
import permission from '@/directive/permission'
export default {
  data() {
    return {
      total: 0,
      listQuery: {
        page: 1,
        limit: 15
      },
      condition: {}, // 查询条件
      dialogStatus: '',
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      promptMessage: {
        title: 'Success',
        message: this.$t('operateSuccessfully'),
        type: 'success',
        duration: 2000
      }
    }
  },
  directives: {
    waves,
    permission
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
    messageBox(cb = () => {}, cc = () => {}) {
      this.$confirm(this.$t('operationPrompt'), this.$t('prompt'), {
        confirmButtonText: this.$t('confirm'),
        cancelButtonText: this.$t('cancel'),
        type: 'warning'
      }).then(() => {
        cb()
      }).catch(() => {
        cc()
      })
    }
    // httpRequestMixin(pageIndex = null, condition = {}, cb = () => {}) {
    //   const option = {
    //     header: {
    //       action: actionCode,
    //       sessionid: sessionStorage.getItem('sessionid'),
    //       ...this.$base,
    //     },
    //     ...condition,
    //   };
    //   if (pageIndex !== null) {
    //     option.header.page = {
    //       index: pageIndex,
    //       size: global.config.pageSize,
    //     };
    //   }
    //   this.$axios.post(global.config.requestUrl, option).then((res) => {
    //     if (res.header.code === 0) {
    //       if (pageIndex !== null) { this.total = res.header.page.total; }
    //       cb(res);
    //     } else {
    //       this.$message.error(res.header.msg);
    //     }
    //   });
    // },
  },
  components: {
    packTable,
    packSearch
  }
}
