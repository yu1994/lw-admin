<template>
  <div>
    <pack-search :search-type-data="searchTypeData" :search-query="queryParam" :opt="options" @search="onSearch" />
    <pack-table :data="tableDataSource" :column="column" :pagination="pagination" :loading="tableLoading" @change="onTableChange">
      <el-table-column slot="status" align="center" label="Status">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>姓名: {{ scope.Title }}</p>
            <p>住址: {{ scope.Author }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.status }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="Status" width="110" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="Display_time" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.display_time }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" :label="$t('operation')" width="280">
        <template slot-scope="scope">
          <el-button size="mini" type="info" @click="handleLook(scope.$index, scope.row)">{{ $t('lookDetail') }}</el-button>
          <el-button size="mini" type="primary" @click="handleEdit(scope.row, scope.row)">{{ $t('edit') }}</el-button>
          <el-popconfirm title="确定删除吗？">
            <el-button slot="reference" size="mini" type="danger">{{ $t('delete') }}</el-button>
          </el-popconfirm>
          <!--<el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">{{ $t('delete') }}</el-button>-->
        </template>
      </el-table-column>
    </pack-table>
    <basic-modal ref="basicModal" :visible.sync="basicModal.visible" :mode="basicModal.mode" @cancel="handleCancel" @ok="handleOk" />
    <!--<pack-dialog :visible.sync="dialogFormVisible" :mode="dialogMode" @cancel="handleCancel" @ok="handleOk">-->
    <!--<span>这是一段信息</span>-->
    <!--</pack-dialog>-->
  </div>
</template>

<script>
import tableMixins from '../../../mixins/tableMixins'
// import dialogMixins from '../../../mixins/dialogMixins'
import { orderStatusAPI } from '../../../api/mockAPI'
import BasicModal from './modal/basicModal'

export default {
  name: 'OrderList',
  components: { BasicModal },
  mixins: [tableMixins],
  data() {
    const column = [
      { label: 'Title', prop: 'title' },
      { label: 'Author', prop: 'author' },
      { prop: 'status', slot: true }, // slot 站位   如果位置在前面
      { label: 'Pageviews', prop: 'pageviews' },
      { label: '地址', prop: 'address' }
    ]
    return {
      column,
      basicModal: {
        visible: false,
        mode: 'add'
      },
      radio: '1',
      url: {
        list: '/supplyManage/plantList/table'
      },
      options: {
        orderStatus: ''
      }
    }
  },
  created() {
    orderStatusAPI().then((response) => {
      this.options.orderStatus = response.data
    })
  },
  mounted() {
    this.searchTypeData = [
      { type: 'input', value: '', label: '订单ID', attr: 'orderID' },
      // { value: 'fas', label: 'test', attr: 'da', slot: true },
      { type: 'input', value: '', label: '订单编号', attr: 'orderNum' },
      { type: 'input', value: '', label: '生产单号', attr: 'productNum' },
      { type: 'input', value: '', label: '用户ID', attr: 'userID' },
      { type: 'input', value: '', label: '交易编号', attr: 'dealsNum' },
      { type: 'input', value: '', label: '收件人手机号', attr: 'mobile' },
      { type: 'input', value: '', label: '物流单号', attr: 'physicalNum' },
      { type: 'select', value: '选项1', label: '订单状态', attr: 'orderStatus' }
      // { type: 'timePicker', value: '', selectableRange: '18:30:00 - 20:30:00', label: '更新时间', attr: 'updateTime' },
      // { type: 'timePickerRange', value: '', label: '范围更新时间', attr: 'updateTimeRange' },
      // { type: 'datePicker', value: '', label: '创建日期', attr: 'createDate' },
      // { type: 'datePickerRange', value: '', label: '创建日期范围', attr: 'createDateRange' },
      // { type: 'dateTimePicker', value: '', label: '日期和时间', pickerOptions: true, attr: 'dateTime' },
      // { type: 'dateTimePickerRange', value: '', label: '日期和时间范围', pickerOptions: true, attr: 'dateTimeRange' }
    ]
  },
  methods: {
    handleLook() {
      this.basicModal.visible = true
      this.basicModal.mode = 'look'
    },
    handleEdit(row) {
      this.basicModal.mode = 'edit'
      this.basicModal.visible = true
      console.log(row)
      // this.temp = Object.assign({}, row) // copy obj
      // this.temp.timestamp = new Date(this.temp.timestamp)
      // this.dialogStatus = 'update'
      // this.$nextTick(() => {
      //   this.$refs['dataForm'].clearValidate()
      // })
    },
    handleCancel() {
      this.basicModal.visible = false
    },
    handleOk() {
      this.$message({
        type: 'success',
        content: 'dd'
      })
    }
  }
}
</script>

<style scoped>

</style>
