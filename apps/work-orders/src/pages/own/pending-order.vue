<!--
  待审批工单
  songjf
-->
<script>
import Vue from 'vue'
import VueClassDecorator from 'vue-class-component'
// import Form from 'iview-ui/form'
// import Steps from 'iview-ui/steps'
const FormItem = Form.Item
// import { Select, Option } from 'iview-ui/select'
// import Input from 'iview-ui/input'
// import Table from 'iview-ui/table'
// import Button from 'iview-ui/button'
// import detailModal from './detail-modal'
// import Modal from 'iview-ui/modal'
import {
  Form,
  Steps,
  Input,
  Table,
  Button,
  Modal,
  Select,
  Option,
  Card,
  Poptip,
} from 'ik-iview'
import _get from 'lodash/get'
const classPrefix = 'pending-order'

export default
@VueClassDecorator({
  mixins: [],

  props: {
    tableList: {
      type: Array,
    },
    reflash: {
      type: Function,
      required: true,
    },
  },

  components: {
    // detailModal
  },

  computed: {},

  watch: {},

  filters: {},

  methods: {},
})
class PendingOrder extends Vue {
  classPrefix = classPrefix

  tmpApproveStatus = false
  tmpApprove = ''

  detailModalVisable = false
  assignVisable = false
  dealVisable = false
  approvalProcess = []
  manageData = {
    status: '审批完成',
    result: '',
    approval_process: 1,
    order_id: '',
  }

  dealOptions = [
    {
      value: '审批完成',
      label: '通过',
    },
    {
      value: '驳回',
      label: '驳回',
    },
  ]

  orderColumn = [
    {
      title: '工单id',
      key: 'order_id',
      align: 'center',
    },
    {
      title: '工单名称',
      key: 'order_name',
      align: 'center',
    },
    {
      title: '工单模版',
      key: 'template_name',
      align: 'center',
    },
    {
      title: '工单状态',
      key: 'status',
      align: 'center',
    },
    {
      title: '发起人',
      key: 'creator',
      align: 'center',
    },
    {
      title: '创建时间',
      key: 'create_time',
      align: 'center',
      render: (h, params) => {
        return (
          <span>
            {/* <Button type="info" style={{marginLeft: '5px'}} on-click={e => { this.detailHandler(params.row.order_id) }}>查看</Button> */}
            <Button
              type="success"
              disabled={params.row.status !== '审批中'}
              style={{ marginLeft: '5px' }}
              on-click={e => {
                this.dealShowHandler(params.row.order_id)
              }}
            >
              处理
            </Button>
          </span>
        )
      },
    },
  ]

  created() { }

  detailData = {}

  get result() {
    if (this.detailData.result) {
      if (this.detailData.result.split('\n').length > 1) {
        return this.detailData.result.split('\n')
      } else {
        return this.detailData.result.split('|')
      }
    } else {
      return ['暂无审批信息']
    }
  }

  // detailHandler (id) {
  //   this.$S.GET_DETAIL_DATA({
  //     restful: id
  //   }).then(res => {
  //     this.detailData = res.data
  //     this.detailModalVisable = true
  //   }).catch(res => {
  //     this.$MessageError(res.msg)
  //   })
  // }

  canceldealHandler() {
    this.dealVisable = false
    this.manageData = {
      status: '审批完成',
      result: '',
      approval_process: 1,
      order_id: ''
    }
    this.tmpApprove = ''
    this.tmpApproveStatus = false
  }

  modalCancel() {
    this.detailModalVisable = false
  }

  dealShowHandler(id) {
    apis
      .GET_DETAIL_DATA({
        restful: id,
      })
      .then(res => {
        this.detailData = res.data
        this.manageData.order_id = id
        // res.data.approval_process.map((value, index, arr) => {
        //   if (value.status === '审批中') {
        //     this.manageData.approval_process = value.process_id
        //     return true
        //   }
        // })
        let index = res.data.approval_process.find((value, index, arr) => {
          return value.status === '审批中'
        })
        this.manageData.approval_process = index.process_id
        this.approvalProcess = res.data.approval_process
        this.dealVisable = true
      })
      .catch(res => {
        this.$MessageError(res.msg)
      })
  }

  assignModelHandler(params) {
    this.assignVisable = true
  }

  assignHandler() {
    this.assignVisable = false
  }

  cancelAssignHandler() {
    this.assignVisable = false
  }

  dealHandler() {
    if (this.tmpApproveStatus) {
      // TEM_APPROVE
      let lastProcess = this.approvalProcess[this.approvalProcess.length - 1]
      apis
        .TEM_APPROVE({
          order_id: this.detailData.order_id,
          creator: this.detailData.creator,
          before_approval_process: lastProcess.process_id,
          tmp_approver: this.tmpApprove,
        })
        .then(res => {
          this.$Message.success('处理成功')
          this.canceldealHandler()
          this.reflash()
        })
        .catch(res => {
          this.canceldealHandler()
          this.$MessageError(res.msg)
        })
    } else {
      apis
        .DEAL_ORDER({
          ...this.manageData,
        })
        .then(res => {
          this.$Message.success('处理成功')
          this.canceldealHandler()
          this.reflash()
        })
        .catch(res => {
          this.canceldealHandler()
          this.$MessageError(res.msg)
        })
    }
  }

  toggleTmpApproveStatus() {
    this.tmpApproveStatus = !this.tmpApproveStatus
  }

  mounted() { }

  render(h) {
    return (
      <div>
        <Table
          style={{ marginTop: '16px' }}
          stripe
          columns={this.orderColumn}
          data={this.tableList}
          border
        ></Table>
        <Modal
          value={this.dealVisable}
          class={classPrefix}
          title="处理工单"
          scrollable
          width="900"
          on-on-ok={this.dealHandler}
          on-on-cancel={this.canceldealHandler}
        >
          <Card dis-hover>
            <Steps
              style="margin-left: 30px"
              current={this.approvalProcess.length}
            >
              {this.approvalProcess.map((value, index, arr) => {
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
                    <Poptip
                      trigger="hover"
                      title="可审批人列表"
                      content={value.approver}
                      class="ivu-steps-content"
                    >
                      {value.approver}
                    </Poptip>
                  </Steps.Step>
                )
              })}
            </Steps>
          </Card>
          <Card dis-hover style="margin-top: 16px;">
            <Form
              model={this.detailData}
              label-width={100}
              style="margin-top: 15px;"
            >
              <FormItem label="工单id：">
                <h4 style="margin-left: 10px">{this.detailData.order_id}</h4>
              </FormItem>
              <FormItem label="工单名称：">
                <h4 style="margin-left: 10px">{this.detailData.order_name}</h4>
              </FormItem>
              <FormItem label="申请信息：">
                {/* <h4 style="margin-left: 10px">{this.detailData.content}</h4> */}
                {_get(this.detailData, 'content', '')
                  .split('\n')
                  .map(i => (
                    <h4 style="margin-left: 10px">{i}</h4>
                  ))}
              </FormItem>
              <FormItem label="服务树节点：">
                <h4 style="margin-left: 10px">{this.detailData.tagstring}</h4>
              </FormItem>
              <FormItem label="发起时间：">
                <h4 style="margin-left: 10px">{this.detailData.create_time}</h4>
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
          </Card>
          <Card dis-hover style="margin-top: 16px;">
            {!this.tmpApproveStatus ? (
              <Form
                model={this.manageData}
                label-width={100}
                style="margin-top: 15px;"
              >
                <FormItem label="审批状态：">
                  <Select
                    value={this.manageData.status}
                    on-input={e => {
                      this.manageData.status = e
                    }}
                  >
                    {this.dealOptions.map(i => (
                      <Option value={i.value} label={i.label}></Option>
                    ))}
                  </Select>
                </FormItem>
                <FormItem label="审批信息：">
                  <Input
                    type="textarea"
                    value={this.manageData.result}
                    on-input={e => {
                      this.manageData.result = e
                    }}
                  ></Input>
                </FormItem>
              </Form>
            ) : (
                <Form label-width={100} style="margin-top: 15px;">
                  <FormItem label="临时审批人">
                    <Input
                      value={this.tmpApprove}
                      on-input={e => {
                        this.tmpApprove = e
                      }}
                    ></Input>
                  </FormItem>
                </Form>
              )}
            <Button type="primary" on-click={this.toggleTmpApproveStatus}>
              {!this.tmpApproveStatus ? '增加临时审批人' : '取消'}
            </Button>
          </Card>
        </Modal>

        <Modal
          value={this.assignVisable}
          title="指派"
          scrollable
          width="600"
          on-on-ok={this.assignHandler}
          on-on-cancel={this.cancelAssignHandler}
        >
          指派（这版暂时不加）
        </Modal>
        {/* <detailModal
      data={this.detailData}
      vis={this.detailModalVisable}
      cancel={this.modalCancel}
      ></detailModal> */}
      </div>
    )
  }
}
</script>

<style lang="less" scoped>
@class-prefix: ~'pending-order';

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
