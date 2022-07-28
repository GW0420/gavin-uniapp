import request from '../utils/request';

/**
 * 获取文章详情
 */
export function ArticleDetail(data) {
	return request({
		url: '/article/details',
		data
	});
}


/**
 * 获取文章评论列表
 */
export function ArticleCommentList(data) {
	return request({
		url: '/article/comment/list',
		data
	});
}
