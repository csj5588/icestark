<script>
import Vue from 'vue'
import VueClassDecorator from 'vue-class-component'
import { Card, Button, Page, Table, Row } from 'iview'

import Pop from './pop'
const pageSizeOpts = [10, 20, 30, 50, 100]
const classPrefix = 'index-table'

@VueClassDecorator({
  mixins: [],

  props: {
    requestData: {
      required: {},
      type: Object
    },
    tableData: {
      required: {},
      type: Array
    },
    total: {
      required: {},
      type: Number
    },
    pageInit: {
      required: {},
      type: Function
    }
  },

  components: {},

  computed: {},

  watch: {},

  filters: {},

  methods: {
    delItem() {
      // 删除当前条
      console.log('删除当前条')
    },
    showPop(data) {
      this.popIsShow = true
      // 将数据 传递进组件
      this.editData = JSON.parse(JSON.stringify(data))
    },
    cancelPop() {
      this.popIsShow = false
    }
  }
})
export default class IndexTable extends Vue {
  classPrefix = classPrefix

  editData = {}

  popIsShow = false
  popConfig = {
    title: '修改',
    type: 1 // 0是新增 1是修改
  }

  list = [
    {
      create_time: '2018-09-06 12:01:47',
      app_name: 'inke_mini_twwd',
      creator: '土味问答-召回用户提醒',
      desc: '已报名活动参加提醒'
    },
    {
      create_time: '2018-09-06 12:07:47',
      app_name: 'inke_mini_twwd',
      creator: '土味问答-召回用户提醒02',
      desc: '已报名活动参加提醒02'
    },
    {
      create_time: '2018-09-06 12:08:47',
      app_name: 'inke_mini_twwd',
      creator: '土味问答-召回用户提醒03',
      desc: '已报名活动参加提醒03'
    }
  ]

  columns = [
    {
      title: '创建时间',
      key: 'create_time',
      align: 'center',
      sortable: true
    },
    {
      title: '标题',
      key: 'title',
      align: 'center'
    },
    {
      title: '描述',
      key: 'desc',
      align: 'center'
    },
    {
      title: '发送内容',
      key: 'param',
      align: 'center'
    },
    {
      title: '操作人',
      key: 'creator',
      align: 'center'
    },
    {
      title: '操作',
      align: 'center',
      render: (h, obj) => {
        return (
        <Row>
          <Button style={'margin: 5px 10px;'} type="primary" size="small" icon="edit" on-click={e => this.showPop(obj.row)}>
            编辑
          </Button>
          <Button style="margin:5px 0;" icon="trash-b" type="primary" size="small" on-click={e => this.delItem(obj.row)}>
            删除
          </Button>
        </Row>
        )
      }
    }
  ]

  pageChangeHandler(val) {
    this.requestData.page = val
    this.pageInit()
  }
  sizeChangeHandler(val) {
    this.requestData.limit = val
    this.pageInit()
  }

  created() {}

  mounted() {}

  render(h) {
    return (
      <div class={classPrefix}>
        <Card>
          <Table stripe columns={this.columns} data={this.list} border />
          <div style="overflow:hidden;">
            <Page
              style="margin: 16px 0px 8px;float:right;"
              current={this.requestData.page}
              total={this.total}
              page-size={this.requestData.page_size}
              page-size-opts={pageSizeOpts}
              on-on-change={this.pageChangeHandler}
              on-on-page-size-change={this.sizeChangeHandler}
              show-elevator
              show-sizer
              show-total
            />
          </div>
        </Card>
        <Pop show={this.popIsShow} cancel={this.cancelPop} popConfig={this.popConfig} editData={this.editData}></Pop>
      </div>
    )
  }
}
</script>