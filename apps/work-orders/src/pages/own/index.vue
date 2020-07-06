<!--
  我的工单汇总
  songjf
-->
<script>
import Vue from 'vue'
import VueClassDecorator from 'vue-class-component'
import myOrder from './my-order'
import pendingOrder from './pending-order'
import finishOrder from './finish-order'
import { mapState }  from 'vuex'
// import { Row, Col } from 'iview-ui/grid'
// import Card from 'iview-ui/card'
// import Input from 'iview-ui/input'
// import Form from 'iview-ui/form'
// import Tabs from 'iview-ui/tabs'
import cookie from 'utils/cookies'
import srcConfig from 'src/config'
// import Page from 'iview-ui/page'
// const TabPane = Tabs.Pane
// import Table from 'iview-ui/table'
// import Button from 'iview-ui/button'
import {Row, Col, Card, Input, Form, Tabs, Table, Button, Page} from 'ik-iview'
const TabPane = Tabs.Pane

const classPrefix = 'work-orders-my'

export default
@VueClassDecorator({
  computed: {
    ...mapState(['info'])
  },
  components: {
    FormItem: Form.Item,
    myOrder,
    pendingOrder,
    finishOrder
  }
})
class WorkOrdersDetail extends Vue {
  classPrefix = classPrefix
  data = []
  formStyle = 'width: 200px'
  searchData = ''
  type = 1
  status = 0
  total = 0
  user = 'pass'
  limit = 20
  page = 1

  created () {
    let user = cookie.getItem('mail')
    if (user) {
      this.user = user.split('@')[0]
    }
    this.searchHandler()
  }

  searchHandler () {
    let searchData = ''
    this.searchData ? searchData = this.searchData : searchData = 'all'
    this.$S.SEARCH_ORDER_LIST({
      restful: `status/${this.status}/search/${searchData}/ref_type/${this.type}/ref_user/${this.user}/page_size/${this.limit}/page_index/${this.page}`
    }).then((res) => {
      this.data = res.data.data || []
      this.total = res.data.total_count || 0
    }).catch(res => {
      this.data = res.data.data || []
      this.total = 0
    })
  }

  modalFlash () {
    this.searchHandler()
  }

  pageChangeHandler (val) {
    this.page = val
    this.searchHandler()
  }

  sizeChangeHandler (val) {
    this.limit = val
    this.searchHandler()
  }

  checkoutHandler (key) {
    this.page = 1
    switch (key) {
      case 0:
        this.status = 0
        this.type = 1
        break;
      case 1:
        this.status = 1
        this.type = 2
        break;
      case 2:
        this.status = 0
        this.type = 3
        break;
    }
    this.searchHandler()
  }

  submitPrevent = _ => {
    if (_.keyCode === 13) {
      _.preventDefault()
    }
  }

  render (h) {
    return <div class={classPrefix}>
      <Tabs
      on-on-click={this.checkoutHandler}
      active-key="2"
      type="card">
        <TabPane
        key="1"
        label="我的工单">
        <Card style={{backgroundColor: '#f8f8f9', height: '67px'}} dis-hover>
          <Form label-width={80} inline nativeOnKeydown={this.submitPrevent}>
            <Form-Item label="工单查询">
              <Input style={this.formStyle} value={this.searchData} on-on-enter={this.searchHandler} on-input={(e) => { this.searchData = e }} type="text" placeholder="支持模糊搜索"></Input>
            </Form-Item>
            <Button style={{marginLeft: '10px'}} type="primary" onClick={this.searchHandler}>搜索</Button>
          </Form>
        </Card>
          <myOrder
          tableList={this.data}
          reflash={this.modalFlash}></myOrder>
        </TabPane>
        <TabPane
        key="2"
        label="待审批工单">
          <Card style={{backgroundColor: '#f8f8f9', height: '67px'}} dis-hover>
          <Form label-width={80} inline>
            <Form-Item label="工单查询">
              <Input style={this.formStyle} value={this.searchData} on-input={(e) => { this.searchData = e }} type="text" placeholder="支持模糊搜索"></Input>
            </Form-Item>
            <Button style={{marginLeft: '10px'}} type="primary" onClick={this.searchHandler}>搜索</Button>
          </Form>
        </Card>
          <pendingOrder tableList={this.data}
          reflash={this.modalFlash}></pendingOrder>
        </TabPane>
        <TabPane
        key="3"
        label="已处理工单">
        <Card style={{backgroundColor: '#f8f8f9', height: '67px'}} dis-hover>
          <Form label-width={80} inline>
            <Form-Item label="工单查询">
              <Input style={this.formStyle} value={this.searchData} on-input={(e) => { this.searchData = e }} type="text" placeholder="支持模糊搜索"></Input>
            </Form-Item>
            <Button style={{marginLeft: '10px'}} type="primary" onClick={this.searchHandler}>搜索</Button>
          </Form>
        </Card>
          <finishOrder tableList={this.data}
          reflash={this.modalFlash}
          ></finishOrder>
        </TabPane>
      </Tabs>
      <Page
      style="margin: 5px; text-align: center"
      current={this.page}
      total={this.total}
      page-size={this.limit}
      on-on-change={this.pageChangeHandler}
      on-on-page-size-change={this.sizeChangeHandler}
      page-size-opts={[10, 20, 40, 100]}
      show-sizer
      show-total
     ></Page>
    </div>
  }
}

</script>

<style lang="less" scoped>
@class-prefix: ~'work-orders-my';

.@{class-prefix} {
  width: 1200px;
  margin: 0 auto;
}

</style>
