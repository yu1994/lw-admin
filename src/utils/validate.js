/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str) {
  const valid_map = ['admin', 'editor']
  return valid_map.indexOf(str.trim()) >= 0
}
const rules = {
  required: [{ required: true }],
  whitespace: [{ required: true, whitespace: true }],
  num: [{ required: true, pattern: /^[1-9]\d*$/ }],
  email: [{ required: true, pattern: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/ }],
  numZero: [{ required: true, pattern: /^[0-9]\d*$/ }],
  float: [{ required: true, pattern: /^([1-9]\d*|0)(\.\d{1,4})?$/ }],
  password: [{ required: true, min: 6 }]
}
const errorMessage = {
  required: '必填项',
  requiredInput: '格式有误或未输入',
  requiredChoose: '请选择',
  requiredPassword: '密码不足6位'
}
const formChooseRules = {
  required: {
    required: true,
    message: errorMessage.required,
    trigger: 'change'
  }
}
const formInputRules = {
  required: {
    required: true,
    message: errorMessage.requiredInput,
    trigger: 'blur'
  }
}
export {
  rules,
  errorMessage,
  formChooseRules,
  formInputRules
}
