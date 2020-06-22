<!--
  demo
-->

<script>
import Vue from 'vue';
import VueClassDecorator from 'vue-class-component';
import { Button } from 'iview';

import Table from './components/table';
import Pop from './components/pop';
const classPrefix = 'indexicon-template';

@VueClassDecorator({
  mixins: [],

  props: {},

  components: {},

  computed: {},

  watch: {},

  filters: {},

  methods: {
    handleAdd() {
      console.log('展示添加弹窗')
      this.popIsShow = true
    },
    pageInit() {
      console.log('初始化')
    },
    cancelPop() {
      this.popIsShow = false
    }
  }
})
export default class IndexiconTemplate extends Vue {
  requestData = {}
  tableData = []
  total = 0

  popIsShow = false
  popConfig = {
    title: '新增',
    type: 0 // 0是新增 1是修改
  }

  created() {
    this.pageInit()
  }

  mounted() {}

  render(h) {
    return (
      <div class={classPrefix}>
        <Button type="primary" icon="edit" style="margin:15px 0;" on-click={this.handleAdd}>添加</Button>
        <Table requestData={this.requestData} tableData={this.tableData} total={this.total} pageInit={this.pageInit}></Table>
        <Pop show={this.popIsShow} cancel={this.cancelPop} popConfig={this.popConfig} editData={{}}></Pop>
      </div>
    );
  }
}
</script>

<style lang="less" scoped>
@class-prefix: ~"indexicon-template";
</style>