const BASE_URL = 'https://api.imooc-blog.lgdsunday.club/api';

function request({
	url,
	data,
	method
}) {
	return new Promise((resolve, reject) => {
		uni.request({
			url: BASE_URL + url,
			header: {
				icode: 'C5DBFC20B944D897'
			},
			data,
			method,
			success: ({
				data
			}) => {
				if (data.success) {
					resolve(data);
				} else {
					uni.showToast({
						title: data.message,
						icon: 'none',
						mask: true,
						duration: 3000
					});
					reject(data.message);
				}
			},
			fail: (error) => {
				reject(error);
			}
		});
	});
}

export default request;
