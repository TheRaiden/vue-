// 引入
import axios from 'axios'
import router from '@/router'

// 创建一个axios对象出来
const request = axios.create({
  baseURL: 'http://localhost:8000', //这里跟后端端口号保持一致
  timeout: 5000,
})

request.interceptors.request.use(
  (config) => {
    // 保留已有 Content-Type（兼容文件上传）
    if (!config.headers['Content-Type']) {
      config.headers['Content-Type'] = 'application/json;charset=utf-8'
    }

    // 从 localStorage 获取 Token
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}` // 关键修复点
      console.log('[请求拦截器] 已添加 Authorization 头:', config.headers.Authorization)
    } else {
      console.error('[请求拦截器] Token 不存在')
      // 可选：跳转到登录页
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// response 拦截器
// 可以在接口响应后统一处理结果
request.interceptors.response.use(
  (response) => {
    // response.data即为后端返回的Result
    let res = response.data
    // 兼容服务端返回的字符串数据，如果数据是字符串把他转成对象
    if (typeof res === 'string') {
      res = res ? JSON.parse(res) : res
    }
    // 当权限验证不通过的时候跳转到登录页面
    if (res.code === '401') {
      router.push('/views/login').catch(() => {})
    }
    return res
  },
  (error) => {
    console.log('err' + error) // for debug
    return Promise.reject(error)
  },
)

export default request //导出request 在其他页面可以引用
