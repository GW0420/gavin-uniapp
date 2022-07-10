import request from '../utils/request';

// 热搜文章类型
export const HotTabs = () => {
	return request({
		url: '/hot/tabs',
		get: 'GET'
	});
}

/**
 * 热搜文章列表
 */
export function HotListFromTabType(type) {
	return request({
		url: '/hot/list',
		data: {
			type
		}
	});
}
