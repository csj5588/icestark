export const formRules = {
  uid: [
    { required: true, message: '请输入UID', trigger: 'blur', type: 'string' }
  ],
  time: [
    { required: true, message: '请选择日期', trigger: 'change', type: 'string' }
  ],
  form1: [
    { required: true, message: '请输入提交内容1', trigger: 'blur', type: 'string' }
  ],
  form2: [
    { required: true, message: '请选择提交内容2', trigger: 'change', type: 'array' }
  ],
  form3: [
    { required: true, message: '请选择提交内容3', trigger: 'change', type: 'string' }
  ]
}
