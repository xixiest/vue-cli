import axios from 'axios'
import { Message } from 'element-ui'

// 创建axios实例
const service = axios.create({
  // baseURL: process.env.BASE_API, // api的base_url
  baseURL: '/api', // 会通过代理转发到实际的地址,在config/index.js的proxyTable中配置
  timeout: 15000                  // 请求超时时间
})

// respone拦截器
service.interceptors.response.use(
  response => {
    /**
     * res.error 数组长度不为0为出错，错误原因error[0].message
     */
    const res = response.data
    if ((res.errors) && (res.errors).length > 0) {
      const errorInfo = res.errors[0].message
      Message({
        message: errorInfo,
        type: 'error',
        duration: 3 * 1000
      })
      return Promise.reject(errorInfo)
    } else {
      return response.data
    }
  },
  error => {
    console.log('err' + error)// for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 3 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
