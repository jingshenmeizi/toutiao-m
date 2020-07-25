import Vue from 'vue'
import dayjs from 'dayjs'
// 加载中文语言包
import 'dayjs/locale/zh-cn'

// 配置相对时间的插件
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)
dayjs.locale("zh-cn")

// 配置相对时间过滤器，全局使用
Vue.filter('relativeTime', time => {
    return dayjs().to(dayjs(time))
})