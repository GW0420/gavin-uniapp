import request from '../utils/request';

/**
 * 默认搜索内容
 */
export function DefaultText() {
	return request({
		url: '/search/default-text'
	});
}
