/**
 * 提供mock的空接口, 防止打包过大问题
 */ 
export default {
  intercept (key) {
    console.error('src/config.js 中 IS_MOCK 更改之后, 请重新执行 npm run dev')
  }
}