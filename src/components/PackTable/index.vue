<template>
  <div>
    <el-table
      v-loading="loading"
      :data="data"
      :border="border"
      element-loading-text="Loading"
      fit
      :empty-text="$t('noData')"
      highlight-current-row
    > <!-- @selection-change="selectionFun"   -->
      <el-table-column v-if="tableIndex" :label="'序号'" type="index" width="50" />
      <template v-for="(item,key) in column">
        <el-table-column v-if="!item.slot" :key="key" :label="item.label" :prop="item.prop" :min-width="item.minWidth? item.minWidth : ''" align="center">
          <template slot-scope="scope">
            <div>{{ scope.row[item.prop] === null? '-----' : scope.row[item.prop] }}</div>
          </template>
        </el-table-column>
        <slot v-else :name="item.prop" />
      </template>
      <slot />
    </el-table> <!--  总共页数 count    当前页 index  总共条数 total -->
    <pagination v-if="pagination.total > 0" :total="pagination.total" :page.sync="pagination.page" :limit.sync="pagination.limit" @pagination="onChange" />
  </div>

</template>

<script>
export default {
  name: 'Index',
  props: {
    data: { // 表格数据
      type: Array,
      default: function() {
        return [

        ]
      }
    },
    column: {
      type: Array,
      default: function() {
        return []
      }
    },
    loading: { // 加载loading
      type: Boolean,
      default: true
    },
    border: { // 表格线
      type: Boolean,
      default: true
    },
    pagination: {
      type: Object,
      default: function() {
        return {
          total: 0
        }
      }
    },
    tableIndex: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    onChange(value) {
      this.$emit('change', value)
    }
  }
}
</script>

<style scoped>

</style>
