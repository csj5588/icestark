<!--
  已处理工单
  songjf
-->
<script>
import Vue from 'vue'
import VueClassDecorator from 'vue-class-component'
// import { Row, Col } from 'iview-ui/grid'
// import Tabs from 'iview-ui/tabs'
// import Table from 'iview-ui/table'
// import Button from 'iview-ui/button'
import {Row, Col, Tabs, Table, Button} from 'ik-iview'
import detailModal from './detail-modal'
const classPrefix = 'finish-order'

export default
@VueClassDecorator({
  mixins: [],

  props: {
    tableList: {
      type: Array
    },
    reflash: {
      type: Function,
      required: true
    }
  },

  components: {
    detailModal
  },
})
class FinishOrder extends Vue {
  classPrefix = classPrefix

  detailModalVisable = false
  orderColumn = [{
    title: '工单id',
    key: 'order_id',
    align: 'center',
  }, {
    title: '工单名称',
    key: 'order_name',
    align: 'center',
  }, {
    title: '工单模版',
    key: 'template_name',
    align: 'center',
  }, {
    title: '工单状态',
    key: 'status',
    align: 'center',
  }, {
    title: '发起人',
    key: 'creator',
    align: 'center',
  }, {
    title: '创建时间',
    key: 'create_time',
    align: 'center',
    render: (h, params) => {
      return <span>
        <Button type="info" style={{marginLeft: '5px'}} on-click={e => { this.detailHandler(params.row.order_id) }}>查看</Button>
      </span>
    }
  }]

  created () {

  }

  detailHandler (id) {
    this.$S.GET_DETAIL_DATA({
      restful: id
    }).then(res => {
      this.detailData = res.data
      this.detailModalVisable = true
    }).catch(res => {
      this.$MessageError(res.msg)
    })
  }

  modalCancel () {
    this.detailModalVisable = false
  }

  mounted () {

  }

  render (h) {
    return <div class={classPrefix}>
      <Table
        style={{marginTop: '16px'}}
        stripe
        columns={this.orderColumn}
        data={this.tableList}
        border
      >
      </Table>
      <detailModal
      data={this.detailData}
      vis={this.detailModalVisable}
      cancel={this.modalCancel}
      ></detailModal>
    </div>
  }
}

</script>

<style lang="less" scoped>
@class-prefix: ~'finish-order';

.@{class-prefix} {

}

</style>
