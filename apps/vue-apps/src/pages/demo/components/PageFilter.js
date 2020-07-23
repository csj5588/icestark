import Vue from 'vue'
import VueClassDecorator from 'vue-class-component'
import { Row, Form, FormItem, Select, Option, Input, Button, DatePicker } from 'element-ui'

import '../style/index.css'

import { ADD } from '../constants/modalTypes'
import { selectList, multipleSelectList } from '../constants/selectLists'

const classPrefix = 'element-filter'

@VueClassDecorator({
  mixins: [],

  props: {
    searchData: {
      type: Object,
      default: () => ({})
    }
  },

  components: {
    [Row.name]: Row,
    [Form.name]: Form,
    [FormItem.name]: FormItem,
    [Input.name]: Input,
    [Button.name]: Button,
    [Select.name]: Select,
    [Option.name]: Option,
    [DatePicker.name]: DatePicker
  },

  computed: {

  },

  watch: {

  },

  filters: {

  },

  methods: {

  }
})
export default class PageFilter extends Vue {
  created () {

  }

  mounted () {

  }

  handleSearch () {
    this.$emit('handleSearch', {page: 1})
  }

  handleOper () {
    this.$emit('handleOper', { formparams: {}, type: ADD })
  }

  handleExport () {
    this.$emit('handleExport')
  }

  numCommaReplace(str) {
    return ("" + str).trim().replace(/[^\d\,]/g, ',').replace(/\,+/g, ',');
  }

  render (h) {
    return <div>
      <p class={`${classPrefix}-p`}>查询条件</p>
      <el-row>
        <el-form inline class={`${classPrefix}-form`}>
          <el-form-item label='UID'>
            <el-input
              style="width: 240px"
              value={ this.searchData['uid'] }
              on-input={ e => { this.$emit('changeData', 'searchData', {uid: this.numCommaReplace(e)}) } }
              placeholder="支持批量UID查询，限200"
              clearable
            ></el-input>
          </el-form-item>

          <el-form-item label='日期'>
            <el-date-picker
              type="daterange"
              style="width: 320px"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd"
              value={ this.searchData['time'] }
              on-input={ e => { this.$emit('changeData', 'searchData', {time: e}) } }
              clearable
            ></el-date-picker>
          </el-form-item>

          <el-form-item label='查询条件1'>
            <el-input
              style="width: 200px"
              value={ this.searchData['search1'] }
              on-input={ e => { this.$emit('changeData', 'searchData', {search1: e}) } }
              placeholder="请输入查询条件1"
              clearable
            ></el-input>
          </el-form-item>

          <el-form-item label='查询条件2'>
            <el-select
              style="width: 200px"
              value={ this.searchData['search2'] }
              on-change={ e => { this.$emit('changeData', 'searchData', {search2: e}) } }
              placeholder="请选择查询条件2"
              multiple
              filterable
              clearable
            >
              {
                multipleSelectList && multipleSelectList.map(item =>
                  <el-option key={item.value} value={`${item.value}`} label={item.label}></el-option>
                )
              }
            </el-select>
          </el-form-item>

          <el-form-item label='查询条件3'>
            <el-select
              style="width: 200px"
              value={ this.searchData['search3'] }
              on-change={ e => { this.$emit('changeData', 'searchData', {search3: e}) } }
              placeholder="请选择查询条件3"
              filterable
              clearable
            >
              {
                selectList && selectList.map(item =>
                  <el-option key={item.value} value={`${item.value}`} label={item.label}></el-option>
                )
              }
            </el-select>
          </el-form-item>
        </el-form>
      </el-row>
      <el-row>
        <span class={`${classPrefix}-span`}>操作</span>
        <el-button
          type="primary"
          class={`${classPrefix}-button`}
          on-click={ this.handleSearch }
        >
          查询
        </el-button>
        <el-button
          type="warning"
          class={`${classPrefix}-button`}
          on-click={ this.handleOper }
        >
          新增
        </el-button>
        <el-button
          type="primary"
          class={`${classPrefix}-button`}
          on-click={ this.handleExport }
        >
          导出
        </el-button>
      </el-row>
    </div>
  }
}
