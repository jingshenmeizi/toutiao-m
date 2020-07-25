
import axios from 'axios'
import store from '@/store'
// 这里的request相当于根据指定的配置创建的一个新的axios
const request = axios.create({
    //基础路径
    baseURL: 'http://ttapi.research.itcast.cn/'
})

// 请求拦截器
request.interceptors.request.use(function (config) {
    // 请求发起会经过这里
    // config本次请求的请求配置参数
    const { user } = store.state
    // user有效才有必要设置
    if (user && user.token) {
        // 注意Authorization的格式，必须是以Bearer开头，中间一个空格，后面是token
        config.headers.Authorization = `Bearer ${user.token}`
    }
    // 注意，这里务必返回config，否则请求停在这里出不去
    return config
}, function (error) {
    // 如果请求出错了，会进入这里（请求还没发出去）
    return Promise.reject(error)
})

// 响应拦截器


export default request

