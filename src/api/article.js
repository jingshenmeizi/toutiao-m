/**
 * 文章列表
 */

import request from '@/utils/request'

/**
 * 获取文章列表
 * @param {*} params 
 */
export const getArticleList = params => {
    return request({
        method: 'GET',
        url: '/app/v1_1/articles',
        params
    })
}

/**
 * 获取文章详情
 * @param {*} articleId 
 */
export const getArticleById = articleId => {
    return request({
        method: 'GET',
        url: `/app/v1_0/articles/${articleId}`
    })
}

/**
 * 收藏文章
 */
export const delCollectArticleById = target => {
    return request({
        method: 'DELETE',
        url: `/app/v1_0/article/collections/${target}`,
    })
}

/**
 * 收藏文章
 */
export const collectArticleById = target => {
    return request({
        method: 'POST',
        url: '/app/v1_0/article/collections',
        data: {
            target
        },
    })
}

/**
 * 取消点赞文章
 */
export const delLikedArticleById = target => {
    return request({
        method: 'DELETE',
        url: `/app/v1_0/article/likings/${target}`,
    })
}

/**
 * 点赞文章
 */
export const likedArticleById = target => {
    return request({
        method: 'POST',
        url: '/app/v1_0/article/likings',
        data: {
            target
        },
    })
}
