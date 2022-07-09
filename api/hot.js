import request from '../utils/request';

// 热搜文章类型
export const HotTabs = () => {
	return request({
		url: '/hot/tabs',
		get: 'GET'
	});
}
