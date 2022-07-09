<template>
	<view class="hot-container">
		<!-- logo -->
		<image class="logo" src="@/static/images/logo.png" mode="aspectFit"></image>
		<!-- hot search -->
		<view class="search-box">
			<!-- 搜索模块 -->
			<hot-search placeholderText="uni-app 自定义组件" />
		</view>
		<!-- hot tabs -->
		<view class="tabs-box">
			<!-- 滑动模块 -->
			<hot-tabs :tabData="tabData" defaultIndex="0"></hot-tabs>
		</view>
	</view>
</template>

<script>
import { HotTabs } from '@/api/hot.js';

export default {
	data() {
		return {
			tabData: [],
			defaultIndex: 0
		};
	},
	created() {
		this.getHotTabs();
	},
	methods: {
		async getHotTabs() {
			const { data } = await HotTabs();
			this.tabData = data.list;
		}
	}
};
</script>

<style lang="scss" scoped>
.hot-container {
	background: $uni-bg-color;
	.logo {
		width: 100%;
		height: 80px;
	}
	.search-box {
		padding: 0 16px;
		margin-bottom: $uni-spacing-col-base;
	}
}
</style>
