/**
 * 评论模块
 */


import request from '@/utils/request'

/**
 * 获取文章列表
 * @param {*} params 
 */
export const getCommentList = params => {
    return request({
        method: 'GET',
        url: '/app/v1_0/comments',
        params
    })
}

/**
 * 取消点赞评论
 */
export const delLikedCommentById = target => {
    return request({
        method: 'DELETE',
        url: `/app/v1_0/comment/likings/${target}`,
    })
}

/**
 * 点赞评论
 */
export const likedCommentById = target => {
    return request({
        method: 'POST',
        url: '/app/v1_0/comment/likings',
        data: {
            target
        },
    })
}

/**
 * 发布评论
 */
export const publishComment = data => {
    return request({
        method: 'POST',
        url: '/app/v1_0/comments',
        data
    })
}


