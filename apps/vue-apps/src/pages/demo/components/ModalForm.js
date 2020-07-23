
import Vue from 'vue'
import VueClassDecorator from 'vue-class-component'
import { Dialog, Form, FormItem, Select, Option, Input, Button, DatePicker } from 'element-ui'

import { VIEW } from '../constants/modalTypes'
import { formRules } from '../constants/formRules'
import { selectList, multipleSelectList } from '../constants/selectLists'

@VueClassDecorator({
  mixins: [],

  props: {
    formData: {
      type: Object,
      default: () => ({})
    },
    modalConfig: {
      type: Object,
      default: () => ({})
    }
  },

  components: {
    [Dialog.name]: Dialog,
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
    'modalConfig.visible': {
      handler (value, old) {
        value === false && this.$refs['refForm'].resetFields()
      }
    }
  },

  filters: {

  },

  methods: {

  }
})
export default class ModalForm extends Vue {
  created () {

  }

  mounted () {

  }

  hideDialog () {
    this.$emit('hideDialog')
  }

  handleSubmit () {
    this.$refs['refForm'].validate((valid) => {
      if (valid) {
        this.$emit('handleSubmit')
      }
    })
  }

  numCommaReplace(str) {
    return ("" + str).trim().replace(/[^\d\,]/g, ',').replace(/\,+/g, ',');
  }

  renderForm () {
    const { modalConfig: { type }, formData } = this

    return <el-form
      ref="refForm"
      label-width="120px"
      model={formData}
      rules={formRules}
    >
      <el-form-item label="UID:" prop="uid">
        <el-input
          disabled={type === VIEW}
          value={ formData['uid'] }
          style="width: 300px"
          on-input={ e => { this.$emit('changeData', 'formData', {uid: this.numCommaReplace(e)}) } }
          placeholder="支持批量UID查询，限200"
          clearable
        >
        </el-input>
      </el-form-item>

      <el-form-item label="日期" prop="time">
        <el-datePicker
          type="date"
          value-format="yyyy-MM-dd"
          disabled={type === VIEW}
          value={ formData['time'] }
          style="width: 300px"
          on-input={ e => { this.$emit('changeData', 'formData', {time: e}) } }
          placeholder="请选择日期"
          clearable
        >
        </el-datePicker>
      </el-form-item>

      <el-form-item label="提交内容1" prop="form1">
        <el-input
          disabled={type === VIEW}
          value={ formData['form1'] }
          on-input={ e => { this.$emit('changeData', 'formData', {form1: e}) } }
          style="width: 300px"
          placeholder="请输入提交内容1"
          clearable
        >
        </el-input>
      </el-form-item>

      <el-form-item label="提交内容2" prop="form2">
        <el-select
          disabled={type === VIEW}
          value={ formData['form2'] }
          on-change={ e => { this.$emit('changeData', 'formData', {form2: e}) } }
          style="width: 300px"
          placeholder="请选择提交内容2"
          filterable
          clearable
          multiple
        >
          {
            multipleSelectList && multipleSelectList.map(item =>
              <el-option key={item.value} value={`${item.value}`} label={ item.label }></el-option>
            )
          }
        </el-select>
      </el-form-item>

      <el-form-item label="提交内容3" prop="form3">
        <el-select
          disabled={type === VIEW}
          value={ formData['form3'] }
          on-change={ e => { this.$emit('changeData', 'formData', {form3: e}) } }
          style="width: 300px"
          placeholder="请选择提交内容3"
          filterable
          clearable
        >
          {
            selectList && selectList.map(item =>
              <el-option key={item.value} value={`${item.value}`} label={ item.label }></el-option>
            )
          }
        </el-select>
      </el-form-item>
    </el-form>
  }

  renderFooter () {
    const { hideDialog, handleSubmit, modalConfig: { type } } = this

    return <div>
      <el-button on-click={ hideDialog }>取消</el-button>
      <el-button type="primary" on-click={ handleSubmit } style={ type === VIEW && 'display: none' }>提交</el-button>
    </div>
  }

  render (h) {
    const { modalConfig: { visible, title } } = this
    const { hideDialog, renderForm, renderFooter } = this

    return <el-dialog
      width="600px"
      title={ title }
      visible={ visible }
      on-close={ hideDialog }
    >
      { renderForm() }
      <div slot="footer">
        { renderFooter() }
      </div>
    </el-dialog>
  }
}
