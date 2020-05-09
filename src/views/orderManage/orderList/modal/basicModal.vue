<template>
  <pack-dialog :visible.sync="visible" :mode="$attrs.mode" @cancel="$listeners.cancel" @ok="$listeners.ok" @updateVisible="updateVisible">
    <span>这是一段信息</span>
  </pack-dialog>
</template>

<script>
import dialogMixins from '../../../../mixins/dialogMixins'
export default {
  name: 'BasicModal',
  mixins: [dialogMixins]
}
</script>

<style scoped>

</style>
