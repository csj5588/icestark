import Vue from 'vue'
import VueClassDecorator from 'vue-class-component'
import { Table, TableColumn, Button, MessageBox } from 'element-ui'

// import '../style/index.css'

import { VIEW, EDIT } from '../constants/modalTypes'

const classPrefix = 'element-table'

@VueClassDecorator({
  mixins: [],

  props: {
    tableData: {
      type: Array,
      default: () => []
    },
  },

  components: {
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
    [Button.name]: Button,
    [MessageBox.name]: MessageBox
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
export default class PageTable extends Vue {
  created () {

  }

  mounted () {

  }

  handleFormData (params) {
    const {
      id,
      uid,
      time,
      form1,
      form2,
      form3
    } = params

    return {
      id,
      uid,
      time,
      form1,
      form2: form2.split(','),
      form3
    }
  }

  handleOper (row, type) {
    this.$emit('handleOper', { formparams: this.handleFormData(row), type: type })
  }

  handleDel (row) {
    MessageBox.confirm('确认删除这条数据吗？', '提示', {
      type: 'warning'
    }).then(() => {
      this.$emit('handleDel', row.id)
    }).catch(_ => _)
  }

  render (h) {
    const { tableData, props } = this
    return <el-table
      border
      stripe
      style="margin: 20px 0"
      data={ tableData }
    >
      <el-table-column prop="id" label="ID" align="center" />
      <el-table-column prop="uid" label="UID" align="center" />
      <el-table-column prop="time" label="日期" align="center" />
      <el-table-column
        label="操作"
        align="center"
      >
        {
          props => <div>
            <el-button
              size="small"
              type="primary"
              class={`${classPrefix}-button`}
              on-click={ () => { this.handleOper(props.row, VIEW) } }
            >
              查看
            </el-button>
            <el-button
              size="small"
              type="warning"
              class={`${classPrefix}-button`}
              on-click={ () => { this.handleOper(props.row, EDIT) } }
            >
              编辑
            </el-button>
            <el-button
              size="small"
              type="danger"
              class={`${classPrefix}-button`}
              on-click={ () => { this.handleDel(props.row) } }
            >
              删除
            </el-button>
          </div>
        }
      </el-table-column>
    </el-table>
  }
}
