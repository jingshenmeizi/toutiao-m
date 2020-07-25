/**
 * 封装本地存储操作模块
 */

/**
 * 存储数据
 */
export const setItem = (key, value) => {
    if (typeof value === 'object') {
        // 转化为字符串
        value = JSON.stringify(value)
    }
    window.localStorage.setItem(key, value)
}

/**
* 获取数据
*/
export const getItem = (key) => {
    const value = window.localStorage.getItem(key)
    try {
        // 如果value可以转化为json，则转化后返回，否则代码这里会保存，跳到catch中执行
        return JSON.parse(value)
    } catch (error) {
        return value
    }
}

/**
* 删除数据
*/
export const removeItem = (key) => {
    window.localStorage.removeItem(key)
}