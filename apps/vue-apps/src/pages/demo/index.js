/**
 * @name 项目名称
 * @author 开发人员
 * @date 开发时间
 */

import Vue from 'vue'
import VueClassDecorator from 'vue-class-component'
import { message } from 'element-ui'
import { stringifyParams } from 'ik-utils'

import PageFilter from './components/PageFilter'
import PageTable from './components/PageTable'
import PagePagination from './components/PagePagination'
import ModalForm from './components/ModalForm'

import S from './apis'
import { ADD, VIEW, EDIT } from './constants/modalTypes'

const creatSearchData = () => ({
  uid: '',
  time: [],
  search1: '',
  search2: [],
  search3: '',
  page: 1,
  size: 10
})

const creatFormData = () => ({
  id: '',
  uid: '',
  time: '',
  form1: '',
  form2: [],
  form3: ''
})

const creatModalConfig = () => ({
  visible: false, // 弹窗是否显示
  title: '', // 弹窗标题
  type: '' // 弹窗类型
})

const operType = {
  [ADD]: '新增',
  [VIEW]: '查看',
  [EDIT]: '编辑'
}

@VueClassDecorator({
  mixins: [],

  props: {

  },

  components: {

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
export default class PageTableFilter extends Vue {
  // 查询条件
  searchData = creatSearchData()
  // 表单数据
  formData = creatFormData()
  modalConfig = creatModalConfig()
  tableData = [] // 列表数据
  tableTotal = 0 // 列表条数

  created () {
    this.handleSearch({page: 1})
  }

  mounted () {

  }

  /**
   * 更改 searchData/formData/modalConfig
   * @param {String} str 修改数据名称
   * @param {Object} obj 修改查询条件
   */
  changeData (str, obj) {
    Object.assign(this[str], obj)
  }

  // 关闭弹窗
  hideDialog () {
    this.formData = creatFormData()
    this.changeData('modalConfig', {
      visible: false
    })
  }

  // 处理查询条件
  get searchParmas () {
    const { searchData } = this
    const { time, search2, search3 } = searchData

    const searchParmas = Object.assign({}, searchData, {
      start_time: time[0] || '',
      end_time: time[1] || '',
      search2: search2.join(),
      search3: search3 || ''
    })

    delete searchParmas.time

    return searchParmas
  }

  // 获取数据
  getDataList () {
    console.log('查询数据: ', this.searchParmas)
    S.getDataList(this.searchParmas).then(res => {
      message.success('查询成功')
      this.tableData = res.data.list || []
      this.tableTotal = +res.data.total || 0
    }).catch(res => {
      message.error(res.error_msg || '接口响应异常，请联系管理员')
    })
  }

  // 查询
  handleSearch (params) {
    this.changeData('searchData', params)
    this.getDataList()
  }

  // 新增/查看/编辑
  handleOper (params) {
    this.changeData('formData', params.formparams)
    this.changeData('modalConfig', {
      visible: true,
      type: params.type,
      title: operType[params.type]
    })
  }

  // 导出
  handleExport () {
    const searchParmas = Object.assign({}, this.searchParmas)

    delete searchParmas.page
    delete searchParmas.size

    console.log('导出', `${S.dataListExport}&${stringifyParams(searchParmas)}`)
    // window.open(`${S.dataListExport}&${stringifyParams(searchParmas)}`)
  }

  // 删除
  handleDel (id) {
    const { searchParmas: { page }, tableData } = this

    console.log('删除id: ', id)
    S.postDataDel({ id }).then(res => {
      message.success('删除成功')
      /**
       *  @overview 如果删除操作只是修改状态，需将以下判断注释
       */
      if (page > 1 && tableData.length <= 1) {
        this.changeData('searchData', {page: page - 1})
      }
      this.getDataList()
    }).catch(res => {
      message.error(res.error_msg || '接口响应异常，请联系管理员')
    })
  }

  // 处理表单数据
  get formParmas () {
    const { formData } = this
    const { form2, form3 } = formData

    const formParmas = Object.assign({}, formData, {
      form2: form2.join(),
      form3: form3 || ''
    })

    return formParmas
  }

  // 提交内容
  handleSubmit () {
    const { formParmas } = this

    console.log('提交数据: ', formParmas)
    S.postDataModify(formParmas).then(res => {
      message.success('提交成功')
      this.getDataList()
      this.hideDialog()
    }).catch(res => {
      message.error(res.error_msg || '接口响应异常，请联系管理员')
    })
  }

  render (h) {
    const { searchData, formData, modalConfig, tableData, tableTotal } = this
    const { changeData, hideDialog, handleSearch, handleOper, handleExport, handleDel, handleSubmit } = this

    return <div style={{ padding: '15px' }}>
      <PageFilter
        searchData={ searchData }
        on-changeData={ changeData }
        on-handleSearch={ handleSearch }
        on-handleOper={ handleOper }
        on-handleExport={ handleExport }
      />
      <PageTable
        tableData={ tableData }
        on-handleOper={ handleOper }
        on-handleDel={ handleDel }
      />
      <PagePagination
        searchData={ searchData }
        tableTotal={ tableTotal }
        on-handleSearch={ handleSearch }
      />
      <ModalForm
        formData={ formData }
        modalConfig={ modalConfig }
        on-changeData={ changeData }
        on-hideDialog={ hideDialog }
        on-handleSubmit={ handleSubmit }
      />
    </div>
  }
}
