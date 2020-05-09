<template>
  <div>
    <pack-search :search-type-data="searchTypeData" :search-query="queryParam" @search="onSearch" />
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
          <el-button size="mini" type="default" @click="handleLook(scope.$index, scope.row)">{{ $t('lookDetail') }}</el-button>
          <el-button size="mini" type="primary" @click="handleEdit(scope.row, scope.row)">{{ $t('edit') }}</el-button>
          <el-popconfirm title="确定删除吗？">
            <el-button slot="reference" size="mini" type="danger">{{ $t('delete') }}</el-button>
          </el-popconfirm>
          <!--<el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">{{ $t('delete') }}</el-button>-->
        </template>
      </el-table-column>

      <pack-dialog :visible.sync="dialogFormVisible" :mode="dialogMode" @cancel="handleCancel" @ok="handleOk">
        <span>这是一段信息</span>
      </pack-dialog>
    </pack-table></div>
</template>

<script>
import tableMixins from '../../../mixins/tableMixins'
import dialogMixins from '../../../mixins/dialogMixins'
export default {
  name: 'PlantList',
  mixins: [tableMixins, dialogMixins],
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
      dialogVisible: true,
      radio: '1',
      url: {
        list: '/supplyManage/plantList/table'
      }
    }
  },
  mounted() {
    this.searchTypeData = [
      { type: 'input', value: '', label: '产品名称', attr: 'productName' }
      // {
      //   type: 'select',
      //   value: '选项1',
      //   label: '产品类型',
      //   attr: 'productType',
      //   options: [
      //     {
      //       value: '选项1',
      //       label: '黄金糕'
      //     }, {
      //       value: '选项2',
      //       label: '双皮奶'
      //     }
      //   ]
      // },
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
      this.dialogMode = 'look'
      this.dialogFormVisible = true
    },
    handleEdit(row) {
      this.dialogMode = 'edit'
      console.log(row)
      // this.temp = Object.assign({}, row) // copy obj
      // this.temp.timestamp = new Date(this.temp.timestamp)
      // this.dialogStatus = 'update'
      this.dialogFormVisible = true
      // this.$nextTick(() => {
      //   this.$refs['dataForm'].clearValidate()
      // })
    },
    handleCancel() {
      this.dialogFormVisible = false
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
