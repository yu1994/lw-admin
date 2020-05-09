<template>
  <div>
    <pack-search :search-data="searchData" @search="search">
      <el-button slot="buttonMore" class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">
        {{ $t('add') }}
      </el-button>
    </pack-search>
    <pack-table :data="this.list" :column="column">
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
      <el-table-column align="center" label="操作" width="250">
        <template slot-scope="scope">
          <el-button size="mini" type="default" @click="handleEdit(scope.$index, scope.row)">查看</el-button>
          <el-button v-permission="['Table','editor']" size="mini" type="primary" @click="handleEdit(scope.row, scope.row)">编辑</el-button>
          <el-button v-permission="['Table','delete']" size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </pack-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
    <el-dialog :title="textMap['Edit']" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="70px" style="width: 400px; margin-left:50px;">
        <el-form-item label="Type" prop="type">
          <el-select v-model="temp.type" class="filter-item" placeholder="Please select">
            <el-option v-for="item in calendarTypeOptions" :key="item.key" :label="item.display_name" :value="item.key" />
          </el-select>
        </el-form-item>
        <el-form-item label="Date" prop="timestamp">
          <el-date-picker v-model="temp.timestamp" type="datetime" placeholder="Please pick a date" />
        </el-form-item>
        <el-form-item label="Title" prop="title">
          <el-input v-model="temp.title" />
        </el-form-item>
        <!--<el-form-item label="Status">
          <el-select v-model="temp.status" class="filter-item" placeholder="Please select">
            <el-option v-for="item in statusOptions" :key="item" :label="item" :value="item" />
          </el-select>
        </el-form-item>-->
        <el-form-item label="Imp">
          <el-rate v-model="temp.importance" :colors="['#99A9BF', '#F7BA2A', '#FF9900']" :max="3" style="margin-top:8px;" />
        </el-form-item>
        <el-form-item label="Remark">
          <el-input v-model="temp.remark" :autosize="{ minRows: 2, maxRows: 4}" type="textarea" placeholder="Please input" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          Cancel
        </el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">
          Confirm
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getList, getList2 } from '@/api/table'
import { fetchList } from '@/api/article'
import mixinList from '../../components/MixinList'

export default {
  mixins: [mixinList],
  data() {
    const calendarTypeOptions = [
      { key: 'CN', display_name: 'China' },
      { key: 'US', display_name: 'USA' },
      { key: 'JP', display_name: 'Japan' },
      { key: 'EU', display_name: 'Eurozone' }
    ]
    const column = [
      { label: 'Title', prop: 'title' },
      { label: 'Author', prop: 'author' },
      { prop: 'status', slot: true }, // slot 站位   如果位置在前面
      { label: 'Pageviews', prop: 'pageviews' },
      { label: '地址', prop: 'address' }
    ]
    return {
      list: null,
      searchData: [],
      column,
      calendarTypeOptions,
      temp: {

      },
      dialogFormVisible: false,
      rules: {
        type: [{ required: true, message: this.$errorMessage.required, trigger: 'change' }],
        timestamp: [{ type: 'date', required: true, message: this.$errorMessage.required, trigger: 'change' }],
        title: [this.$formInputRules.required]
      }
    }
  },
  created() {
    this.getList()
  },
  mounted() {
    this.searchData = [
      { type: 'input', value: '', label: '产品名称', attr: 'productName' },
      {
        type: 'select',
        value: '选项1',
        label: '产品类型',
        attr: 'productType',
        options: [
          {
            value: '选项1',
            label: '黄金糕'
          }, {
            value: '选项2',
            label: '双皮奶'
          }
        ]
      },
      { type: 'timePicker', value: '', selectableRange: '18:30:00 - 20:30:00', label: '更新时间', attr: 'updateTime' },
      { type: 'timePickerRange', value: '', label: '范围更新时间', attr: 'updateTimeRange' },
      { type: 'datePicker', value: '', label: '创建日期', attr: 'createDate' },
      { type: 'datePickerRange', value: '', label: '创建日期范围', attr: 'createDateRange' },
      { type: 'dateTimePicker', value: '', label: '日期和时间', pickerOptions: true, attr: 'dateTime' },
      { type: 'dateTimePickerRange', value: '', label: '日期和时间范围', pickerOptions: true, attr: 'dateTimeRange' }
    ]
  },
  methods: {
    search(filter) {
      this.condition = {
        productName: filter.productName
      }
      this.listQuery.page = 1
      this.getList()
    },
    getList() {
      getList2(this.listQuery).then(response => {
        this.list = response.data.items
        this.total = response.data.total
      })
    },
    handleEdit(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.temp.timestamp = new Date(this.temp.timestamp)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    handleDelete(row) {
      this.messageBox(() => {
        this.$message(this.promptMessage)
      })
    },
    handleCreate() {
      this.temp = {}
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
          updateArticle(tempData).then(() => {
            for (const v of this.list) {
              if (v.id === this.temp.id) {
                const index = this.list.indexOf(v)
                this.list.splice(index, 1, this.temp)
                break
              }
            }
            this.dialogFormVisible = false
            this.$notify({
              title: 'Success',
              message: 'Update Successfully',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          tempData.timestamp = +new Date(tempData.timestamp)
          updateArticle(tempData).then(() => {
            for (const v of this.list) {
              if (v.id === this.temp.id) {
                const index = this.list.indexOf(v)
                this.list.splice(index, 1, this.temp)
                break
              }
            }
            this.dialogFormVisible = false
            this.$notify(this.promptMessage)
          })
        }
      })
    }
  }
}
</script>
