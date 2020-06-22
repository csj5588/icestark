<script>
import Vue from 'vue'
import VueClassDecorator from 'vue-class-component'
import { Modal, Form, Input, Button } from 'iview'
import { formRule } from '../rules.js'
const FormItem = Form.Item
const classPrefix = 'pop-template'

@VueClassDecorator({
  mixins: [],

  props: {
    show: {
      required: true,
      type: Boolean,
      default: false
    },
    cancel: {
      required: true,
      type: Function
    },
    popConfig: {
      required: true,
      type: Object,
      default: () => {}
    },
    editData: {
      required: true,
      type: Object,
      default: () => {}
    }
  },

  components: {},

  computed: {},

  watch: {
    show(val, old) {
      if (val !== old) {
        this.$refs.modal.visible = val
      }
    },
    editData(val, old) {
      if (val === old) return
      if (this.popConfig.type) {
        this.submitData = JSON.parse(JSON.stringify(val))
      } else {
        this.submitData = {}
      }
    }
  },

  filters: {},

  methods: {}
})
export default class PopTemplate extends Vue {
  classPrefix = classPrefix

  submitData = {}

  // 确定按钮loading状态
  loading = true

  changeLoading() {
    this.loading = false
    this.$nextTick(() => {
      this.loading = true
    })
  }

  onOk() {
    this.$refs['popForm'].validate((valid) => {
      if (valid) {
        this.changeLoading()
        console.log('提交数据')
      } else {
        this.changeLoading()
        this.$Message.error('请按照规则键入相关信息')
      }
    })
  }

  onCancel() {
    this.$refs['popForm'].resetFields()
    this.cancel()
  }

  created() {}

  mounted() {}

  render(h) {
    return (
      <div class={classPrefix}>
        <Modal title={this.popConfig.title} ref="modal" ok-text="提交" on-on-ok={this.onOk} on-on-cancel={this.onCancel} loading={this.loading} transfer width="666">
          <Form ref="popForm" label-width={80} model={this.submitData} rules={formRule}>
            <FormItem label="作者：" prop="creator">
              <Input
                style="width: 80%;"
                on-input={e => {
                  this.$set(this.submitData, 'creator', e)
                }}
                value={this.submitData.creator || ''}
                clearable
              />
            </FormItem>
          </Form>
        </Modal>
      </div>
    )
  }
}
</script>
<style lang="less" scoped>
</style>