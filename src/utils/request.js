import axios from 'axios'

/**
 * 如果存在多个服务器 ip不一致需要请求的话，
 * 就创建再创建一个 request1.js、request2.js等等，接着再在
 * 需要用的api接口请求中引入即可
 */
export function request(config) {
  // 创建axios实例
  const instance = axios.create({
    baseURL: 'http://152.136.185.210:7878/api/m5',//此处目前使用的是老师提供的url
    // baseURL: 'http://localhost:8033',
    timeout: 5000
  });

  // 请求拦截
  instance.interceptors.request.use(config => {
    // 拦截的作用，例如：拦截config，并给请求头加上 token
    // config.headers['token'] = getToken()
    // console.log(config);
    return config
  }, err => {
    // console.log(err);
    return err
  })

  // 响应拦截
  instance.interceptors.response.use(res => {
    return res.data
  }, err => {
    return err
  })

  // 发送真正请求
  return instance(config);
}