import request from '../utils/request';
//账号
export const getAccountPage = query => {
    return request({
        url: '/account/getAccountPage',
        method: 'get',
        params: query
    });
};
export const updateAccount = data => {
    return request({
        url: '/account/updateAccount',
        method: 'post',
        data: data
    });
};
export const addAccount = data => {
    return request({
        url: '/account/addAccount',
        method: 'post',
        data: data
    });
};
export const deleteAccount = data => {
    return request({
        url: '/account/deleteAccount',
        method: 'post',
        data: data
    });
};
export const getAccountData = query => {
    return request({
        url: '/account/getAccountData',
        method: 'get',
        params: query
    });
};
//用户
export const getUserPage = query => {
    return request({
        url: '/user/getUserPage',
        method: 'get',
        params: query
    });
};
export const addUser = data => {
    return request({
        url: '/user/addUser',
        method: 'post',
        data: data
    });
};
export const updateUser = data => {
    return request({
        url: '/user/updateUser',
        method: 'post',
        data: data
    });
};
export const deleteUser = data => {
    return request({
        url: '/user/deleteUser',
        method: 'post',
        data: data
    });
};
//角色
export const getRolePage = query => {
    return request({
        url: '/role/getRolePage',
        method: 'get',
        params: query
    });
};
export const addRole = data => {
    return request({
        url: '/role/addRole',
        method: 'post',
        data: data
    });
};
export const updateRole = data => {
    return request({
        url: '/role/updateRole',
        method: 'post',
        data: data
    });
};
export const deleteRole = data => {
    return request({
        url: '/role/deleteRole',
        method: 'post',
        data: data
    });
};
export const getRoleData = query => {
    return request({
        url: '/role/getRoleData',
        method: 'get',
        params: query
    });
};
//操作
export const getOperatePage = query => {
    return request({
        url: '/operate/getOperatePage',
        method: 'get',
        params: query
    });
};
export const addOperate = data => {
    return request({
        url: '/operate/addOperate',
        method: 'post',
        data: data
    });
};
export const updateOperate = data => {
    return request({
        url: '/operate/updateOperate',
        method: 'post',
        data: data
    });
};
export const deleteOperate = data => {
    return request({
        url: '/operate/deleteOperate',
        method: 'post',
        data: data
    });
};
//类目
export const getCategoryPage = query => {
    return request({
        url: '/category/getCategoryPage',
        method: 'get',
        params: query
    });
};
export const addCategory = data => {
    return request({
        url: '/category/addCategory',
        method: 'post',
        data: data
    });
};
export const updateCategory = data => {
    return request({
        url: '/category/updateCategory',
        method: 'post',
        data: data
    });
};
export const deleteCategory = data => {
    return request({
        url: '/category/deleteCategory',
        method: 'post',
        data: data
    });
};
export const getCategoryData = query => {
    return request({
        url: '/category/getCategoryData',
        method: 'get',
        params: query
    });
};
//博客
export const getEssayPage = query => {
    return request({
        url: '/essay/getEssayPage',
        method: 'get',
        params: query
    });
};
export const addEssay = data => {
    return request({
        url: '/essay/addEssay',
        method: 'post',
        data: data
    });
};
export const updateEssay = data => {
    return request({
        url: '/essay/updateEssay',
        method: 'post',
        data: data
    });
};
export const deleteEssay = data => {
    return request({
        url: '/essay/deleteEssay',
        method: 'post',
        data: data
    });
};
export const getEssayData = query => {
    return request({
        url: '/essay/getEssayData',
        method: 'get',
        params: query
    });
};
export const getEssay = query => {
    return request({
        url: '/essay/getEssay',
        method: 'get',
        params: query
    });
};
//轮播
export const getChannelPage = query => {
    return request({
        url: '/channel/getChannelPage',
        method: 'get',
        params: query
    });
};
export const addChannel = data => {
    return request({
        url: '/channel/addChannel',
        method: 'post',
        data: data
    });
};
export const updateChannel = data => {
    return request({
        url: '/channel/updateChannel',
        method: 'post',
        data: data
    });
};
export const deleteChannel = data => {
    return request({
        url: '/channel/deleteChannel',
        method: 'post',
        data: data
    });
};
//搜索关键字
export const getSearchPage = query => {
    return request({
        url: '/search/getSearchPage',
        method: 'get',
        params: query
    });
};
export const addSearch = data => {
    return request({
        url: '/search/addSearch',
        method: 'post',
        data: data
    });
};
export const updateSearch = data => {
    return request({
        url: '/search/updateSearch',
        method: 'post',
        data: data
    });
};
export const deleteSearch = data => {
    return request({
        url: '/search/deleteSearch',
        method: 'post',
        data: data
    });
};
//搜索历史
export const getHistoryPage = query => {
    return request({
        url: '/history/getHistoryPage',
        method: 'get',
        params: query
    });
};
export const addHistory = data => {
    return request({
        url: '/history/addHistory',
        method: 'post',
        data: data
    });
};
export const updateHistory = data => {
    return request({
        url: '/history/updateHistory',
        method: 'post',
        data: data
    });
};
export const deleteHistory = data => {
    return request({
        url: '/history/deleteHistory',
        method: 'post',
        data: data
    });
};
//热门博客榜单
export const getRecommendPage = query => {
    return request({
        url: '/recommend/getRecommendPage',
        method: 'get',
        params: query
    });
};
export const addRecommend = data => {
    return request({
        url: '/recommend/addRecommend',
        method: 'post',
        data: data
    });
};
export const updateRecommend = data => {
    return request({
        url: '/recommend/updateRecommend',
        method: 'post',
        data: data
    });
};
export const deleteRecommend = data => {
    return request({
        url: '/recommend/deleteRecommend',
        method: 'post',
        data: data
    });
};