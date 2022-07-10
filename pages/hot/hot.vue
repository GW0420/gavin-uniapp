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
			<hot-tabs :tabData="tabData" :defaultIndex="currentIndex" @tabClick="tabClick"></hot-tabs>
		</view>
		<!-- hot 视图 -->
		<view class="list">
			<!-- 加载动画 -->
			<uni-load-more status="loading" v-if="isLoading"></uni-load-more>
			<!-- 列表 -->
			<block v-else>
				<!-- list-item -->
				<hot-list-item v-for="(item, index) in listData[currentIndex]" :key="index" :data="item" :ranking="index + 1"></hot-list-item>
			</block>
		</view>
	</view>
</template>

<script>
import { HotTabs, HotListFromTabType } from '@/api/hot.js';

export default {
	data() {
		return {
			tabData: [],
			currentIndex: 0,
			isLoading: true,
			listData: {} //  以 index 为 key，对应的 list 为 val
		};
	},
	created() {
		this.getHotTabs();
	},
	methods: {
		// 热搜标题数据
		async getHotTabs() {
			const { data } = await HotTabs();
			this.tabData = data.list;
			// 获取列表数据
			this.getHotListFromTab();
		},
		// list列表数据
		async getHotListFromTab() {
			// 展示 loading
			this.isLoading = true;
			// 判断缓存是否有数据，不存在则重新获取数据
			if (!this.listData[this.currentIndex]) {
				// 获取列表数据
				const id = this.tabData[this.currentIndex].id;
				const { data: res } = await HotListFromTabType(id);
				// 放入数据缓存
				this.listData[this.currentIndex] = res.list;
			}

			// 隐藏 loading
			this.isLoading = false;
		},
		// tab item点击事件
		tabClick(index) {
			this.currentIndex = index;
			// 获取列表数据
			this.getHotListFromTab();
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
