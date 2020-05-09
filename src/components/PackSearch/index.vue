<template>
  <div class="wrap">
    <div v-for="(item, key) in searchList" :key="key" class="wrap-item">
      <template v-if="item.slot">
        <slot :name="item.attr" />
      </template>
      <template v-if="item.type === 'input'">
        {{ item.label }}:
        <el-input v-model="item.value" :placeholder="$t('pleaseContent')" :style="styleInput" class="filter-item" clearable prefix-icon="el-icon-edit" @keyup.enter.native="handleFilter" />
      </template>
      <template v-if="item.type === 'select'">
        {{ item.label }}:
        <el-select v-model="item.value" clearable :placeholder="$t('pleaseChoose')">
          <el-option v-for="(opt, i) in opt[item.attr]" :key="i" :label="opt.label" :value="opt.value" />
        </el-select>
      </template>
      <template v-if="item.type === 'timePicker'"> <!-- 时间-->
        {{ item.label }}:
        <el-time-picker v-model="item.value" :value-format="timeFormat" :picker-options="{selectableRange: item.selectableRange}" :placeholder="$t('pleaseChoose')" />
      </template>
      <template v-if="item.type === 'timePickerRange'"> <!--时间范围 -->
        {{ item.label }}:
        <el-time-picker
          v-model="item.value"
          is-range
          :value-format="timeFormat"
          :range-separator="$t('to')"
          :start-placeholder="$t('startTime')"
          :end-placeholder="$t('endTime')"
          :placeholder="$t('pleaseChoose')"
        />
      </template>
      <template v-if="item.type === 'datePicker' || item.type === 'dateTimePicker'"> <!--日期 和 日期时间 -->
        {{ item.label }}:
        <el-date-picker
          v-model="item.value"
          :value-format="item.type === 'datePicker'? dateFormat : dateTimeFormat"
          :type="item.type === 'datePicker'? 'date' : 'datetime'"
          :picker-options="item.pickerOptions? datePickerOptions : ''"
          align="right"
          :placeholder="$t('pleaseChoose')"
        />
      </template>
      <template v-if="item.type === 'datePickerRange' || item.type === 'dateTimePickerRange'"> <!--日期范围 和 日期时间范围 -->
        {{ item.label }}:
        <el-date-picker
          v-model="item.value"
          :value-format="item.type === 'datePickerRange'? dateFormat : dateTimeFormat"
          :type="item.type === 'datePickerRange'? 'daterange' : 'datetimerange'"
          :picker-options="item.pickerOptions? dateTimePickerOptions : ''"
          :range-separator="$t('to')"
          :start-placeholder="$t('startDate')"
          :end-placeholder="$t('endDate')"
        />
      </template>
    </div>
    <div class="wrap-item">
      <slot name="optionsMore" />
    </div>
    <div class="wrap-item">
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">{{ $t('search') }}</el-button>
      <slot name="buttonMore" />
      <el-button v-if="showAdd" v-waves class="filter-item" type="primary" icon="el-icon-edit" @click="handleAdd">{{ $t('add') }}</el-button>
      <el-button v-waves class="filter-item" type="default" icon="el-icon-refresh" @click="handleRefresh">{{ $t('reset') }}</el-button>
    </div>
  </div>
</template>

<script>
import waves from '@/directive/waves'
export default {
  name: 'PackSearch',
  directives: {
    waves
  },
  props: {
    searchTypeData: {
      type: Array,
      default() {
        return []
      }
    },
    opt: {
      type: Object,
      default() {
        return {}
      }
    },
    searchQuery: {
      type: Object,
      default() {
        return {}
      }
    },
    styleInput: {
      type: Object,
      default: function() {
        return {
          width: '200px'
        }
      }
    },
    timeFormat: {
      type: String,
      default: 'HH:mm:ss'
    },
    dateFormat: {
      type: String,
      default: 'yyyy-MM-dd'
    },
    dateTimeFormat: {
      type: String,
      default: 'yyyy-MM-dd HH:mm:ss'
    },
    showAdd: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      searchList: [],
      datePickerOptions: {
        shortcuts: [{
          text: this.$t('el.datepicker.today'),
          onClick(picker) {
            picker.$emit('pick', new Date())
          }
        }, {
          text: this.$t('yesterday'),
          onClick(picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24)
            picker.$emit('pick', date)
          }
        }, {
          text: this.$t('weekGo'),
          onClick(picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', date)
          }
        }]
      },
      dateTimePickerOptions: {
        shortcuts: [{
          text: this.$t('lastWeek'),
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: this.$t('lastMonth'),
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: this.$t('lastThreeMonths'),
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      }
    }
  },
  watch: {
    searchTypeData(value) {
      this.$nextTick(() => {
        this.searchList = Object.assign([], value)
        console.log(this.searchList)
      })
    }
  },
  methods: {
    handleFilter() {
      this.$emit('search', this.filter())
    },
    handleAdd() {
      this.$emit('add')
    },
    handleRefresh() {
      const data = this.searchList
      Object.keys(data).forEach((key) => {
        if (data[key].type === 'input' || data[key].type === 'select' || data[key].type === 'timePicker' || data[key].type === 'datePicker' || data[key].type === 'dateTimePicker') {
          data[key].value = ''
        } else {
          data[key].value = []
        }
      })
    },
    filter() {
      const obj = {}
      this.searchList.forEach((item) => {
        obj[item.attr] = item.value
      })
      return obj
    }
  }
}
</script>

<style scoped lang="stylus">
  .wrap
    .wrap-item
      display inline-block
      margin-right 20px
      margin-bottom 20px
</style>
