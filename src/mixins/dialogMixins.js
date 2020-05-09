import packDialog from '../components/PackDialog'
export default {
  components: { packDialog },
  props: {
    visible: {
      type: Boolean
    },
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
  },
  methods: {
    updateVisible() {
      this.$emit('update:visible', false)
    }
  }
}
