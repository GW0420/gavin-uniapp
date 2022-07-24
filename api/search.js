import request from '../utils/request';

/**
 * 默认搜索内容
 */
export function DefaultText() {
	return request({
		url: '/search/default-text'
	});
}
/**
 * 热搜搜索列表
 */
export function SearchHotList() {
	return request({
		url: '/search/hot-list'
	});
}

/**
 * 搜索结果
 */
export function SearchResult(data) {
	return request({
		url: '/search',
		data
	});
}
