<template>
  <el-dialog :title="$t(mode)" :visible.sync="dialogVisible" @close="$emit('updateVisible', false)"> <!--textMap['Edit']-->
    <slot />
    <div v-if="isFooter" slot="footer" class="dialog-footer">
      <el-button @click="$listeners.cancel()">
        {{ $t('cancel') }}
      </el-button>
      <el-button type="primary" @click="$listeners.ok()">
        {{ $t('confirm') }}
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'PackDialog',
  props: {
    visible: {
      type: Boolean
    },
    mode: {
      type: String,
      default: 'add'
    },
    isFooter: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      dialogVisible: this.visible
    }
  },
  watch: {
    visible() {
      this.dialogVisible = this.visible
    }
  }
}
</script>

<style scoped>

</style>
