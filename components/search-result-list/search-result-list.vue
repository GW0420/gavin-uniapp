<template>
	<view class="search-result-list-container">
		<!-- 循环渲染列表数据 -->
		<block v-for="(item, index) in resultList" :key="index">
			<view class="search-result-item-box">
				<!-- 内容区 - 样式 1 -->
				<search-result-item-theme-1 v-if="!item.pic_list || item.pic_list.length === 0" :data="item" />

				<!-- 内容区 - 样式 2 -->
				<search-result-item-theme-2 v-else-if="item.pic_list.length === 1" :data="item" />

				<!-- 内容区 - 样式 3 -->
				<search-result-item-theme-3 v-else :data="item" />

				<!-- / -->
			</view>
		</block>
	</view>
</template>

<script>
import { SearchResult } from 'api/search';
export default {
	name: 'search-result-list',
	props: {
		// 搜索关键字
		queryStr: {
			type: String,
			required: true
		}
	},
	data() {
		return {
			// 数据源
			resultList: [],
			// 页数
			page: 1
		};
	},
	created() {
		this.loadSearchResult();
	},
	methods: {
		/**
		 * 获取搜索数据
		 */
		async loadSearchResult() {
			let params = { q: this.queryStr, p: this.page };
			const { data } = await SearchResult(params);
			this.resultList = data.list;
		}
	}
};
</script>

<style lang="scss">
.search-result-list-container {
	padding: 10px;
	.search-result-item-box {
		margin: 15px 10px;
	}
}
</style>
