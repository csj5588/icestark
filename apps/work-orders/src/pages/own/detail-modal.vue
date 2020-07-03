<!--
  组件功能
  姓名 时间
-->
<script>
import Vue from 'vue'
import VueClassDecorator from 'vue-class-component'
// import Modal from 'iview-ui/modal'
// import Form from 'iview-ui/form'
// const FormItem = Form.Item
// import Input from 'iview-ui/input'
// import Button from 'iview-ui/button'
// import Steps from 'iview-ui/steps'
import { Modal, Form, Input, Button, Steps, Poptip } from 'ik-iview'
const FormItem = Form.Item
import _get from 'lodash/get'
const classPrefix = 'detail-modal'

export default
@VueClassDecorator({
  mixins: [],

  props: {
    vis: {
      type: Boolean,
      default: false,
    },
    cancel: {
      type: Function,
      required: true,
    },
    data: {
      type: Object,
    },
  },

  components: {},

  computed: {
    result() {
      if (this.modalData.result) {
        if (this.modalData.result.split('\n').length > 1) {
          return this.modalData.result.split('\n')
        } else {
          return this.modalData.result.split('|')
        }
      } else {
        return ['暂无审批信息']
      }
    },
  },

  watch: {
    vis: function(val, oldval) {
      this.visable = val
    },
    data: function(val, oldval) {
      this.modalData = Object.assign({}, val)
    },
  },

  filters: {},

  methods: {},
})
class detailModal extends Vue {
  classPrefix = classPrefix
  modalData = {
    approval_process: [],
  }
  created() {}
  cancelHandler() {
    this.cancel()
  }
  mounted() {}

  render(h) {
    return (
      <Modal
        class={classPrefix}
        value={this.vis}
        title="工单详情"
        scrollable
        width="900"
        on-on-ok={this.cancelHandler}
        on-on-cancel={this.cancelHandler}
      >
        <Steps
          style="margin-left: 30px"
          current={this.modalData.approval_process.length}
        >
          {this.modalData.approval_process.map((value, index, arr) => {
            return (
              <Steps.Step
                status={
                  value.status === '驳回'
                    ? 'error'
                    : value.status === '审批中'
                    ? 'wait'
                    : 'finish'
                }
                title={value.status}
              >
              <Poptip trigger="hover" title="可审批人列表" content={value.approver} class="ivu-steps-content">
                {value.approver}
              </Poptip>
            </Steps.Step>
            )
          })}
        </Steps>
        <Form
          model={this.modalData}
          label-width={100}
          style="margin-top: 15px;"
        >
          <FormItem label="工单id：">
            <h4 style="margin-left: 10px">{this.modalData.order_id}</h4>
          </FormItem>
          <FormItem label="工单名称：">
            <h4 style="margin-left: 10px">{this.modalData.order_name}</h4>
          </FormItem>
          <FormItem label="申请信息：">
            {/* <h4 style="margin-left: 10px">{this.modalData.content}</h4> */}
            {_get(this.modalData, 'content', '')
              .split('\n')
              .map(i => (
                <h4 style="margin-left: 10px">{i}</h4>
              ))}
          </FormItem>
          <FormItem label="服务树节点：">
            <h4 style="margin-left: 10px">{this.modalData.tagstring}</h4>
          </FormItem>
          <FormItem label="发起时间：">
            <h4 style="margin-left: 10px">{this.modalData.create_time}</h4>
          </FormItem>
          <FormItem label="审批信息：">
            {this.result.map(i => (
              <div>
                <h4 style="margin-left: 10px">{i}</h4>
                <br />
              </div>
            ))}
          </FormItem>
        </Form>
      </Modal>
    )
  }
}
</script>

<style lang="less" scoped>
@class-prefix: ~'detail-modal';

.@{class-prefix} {
  /deep/ .ivu-steps-content {
    display: block;
    width: 220px;
    overflow: hidden;
    white-space: normal;
    text-overflow: ellipsis;
  }
}
</style>
