import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '../store'
import strRes from '@/res/strRes'
import { getToken } from '@/utils/auth'

// 创建axios实例
const service = axios.create({
  // baseURL: process.env.BASE_API, // api的base_url
  // baseURL: 'https://1jzxrj179.lp.gql.zone/graphql', // api的base_url
  baseURL: '/rest/graph', // 会通过代理转发到实际的地址,在config/index.js的proxyTable中配置
  timeout: 15000                  // 请求超时时间
})

// request拦截器
service.interceptors.request.use(config => {
  if (store.getters.token) {
    config.headers['access_token'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
  }
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => {
    /**
     * res.error 数组长度不为0为出错，错误原因error[0].message
     */
    const res = response.data
    if ((res.errors) && (res.errors).length > 0) {
      Message({
        // message: res.errors[0].message.split(':')[2],
        message: strRes.query_failed,
        type: 'error',
        duration: 3 * 1000
      })
      const errorInfo = res.errors[0].message
      // const error = errorInfo.substr(0, errorInfo.indexOf(':'))
      const error = errorInfo.split(':')[2]
      return Promise.reject(error)
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
