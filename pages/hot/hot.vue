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
		<!-- 基于swiper的list列表 -->
		<swiper class="swiper" :style="{ height: currentSwiperHeight + 'px' }" :current="currentIndex">
			<swiper-item class="swiper-item" v-for="(tabItem, tabIndex) in tabData" :key="tabIndex">
				<view class="list">
					<!-- 加载动画 -->
					<uni-load-more status="loading" v-if="isLoading"></uni-load-more>
					<!-- 列表 -->
					<block v-else>
						<!-- list-item -->
						<hot-list-item
							:class="'hot-list-item-' + tabIndex"
							v-for="(item, index) in listData[tabIndex]"
							:key="index"
							:data="item"
							:ranking="index + 1"
						></hot-list-item>
					</block>
				</view>
			</swiper-item>
		</swiper>
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
			listData: {}, //  以 index 为 key，对应的 list 为 val
			currentSwiperHeight: 0, // 当前 swiper的高度
			swiperHeightData: {} // 以 index 为 key, 对应的 swiper 的高度为 val
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
				const { data } = await HotListFromTabType(id);
				// 放入数据缓存
				this.listData[this.currentIndex] = data.list;
			}
			// 隐藏 loading
			this.isLoading = false;
			// 获取swiper总高度
			setTimeout(async () => {
				// 获取当前 swiper 的高度
				this.currentSwiperHeight = await this.getCurrentSwiperHeight();
				// 放入缓存
				this.swiperHeightData[this.currentIndex] = this.currentSwiperHeight;
			}, 0);
		},
		// tab item点击事件
		tabClick(index) {
			this.currentIndex = index;
			// 获取列表数据
			this.getHotListFromTab();
		},
		// 计算当前 swiper的高度
		getCurrentSwiperHeight() {
			return new Promise((resolve, reject) => {
				let sum = 0;
				const query = uni.createSelectorQuery().in(this);
				query
					.selectAll(`.hot-list-item-${this.currentIndex}`)
					.boundingClientRect(res => {
						res.forEach(item => {
							sum += item.height;
						});
						resolve(sum);
					})
					.exec();
			});
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
