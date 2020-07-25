/**
 *搜索模块
 */

import request from '@/utils/request'

/**
 * 获取搜索建议
 */
export const getSuggestions = q => {
    return request({
        method: 'GET',
        url: '/app/v1_0/suggestion',
        params:{
            q
        }
    })
}

/**
 * 获取搜索结果
 */
export const getSearchResults = param => {
    return request({
        method: 'GET',
        url: '/app/v1_0/search',
        params:param
    })
}