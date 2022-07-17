<template>
	<view class="search-blog-container">
		<!-- search模块 -->
		<view class="search-bar-box">
			<hot-search
				v-model:searchVal="searchVal"
				:isShowInput="true"
				:config="{
					backgroundColor: '#f1f0f3'
				}"
				:placeholderText="defaultText"
				@search="onSearchConfirm"
				@input="onSearchInput"
				@focus="onSearchFocus"
				@blur="onSearchBlur"
				@clear="onSearchClear"
				@cancel="onSearchCancel"
			></hot-search>
		</view>
		<!-- 热搜列表 -->
		<view class="search-hot-list-box" v-if="showType === HOT_LIST">
			<!-- 列表 -->
			<search-hot-list />
		</view>
		<!-- 搜索历史 -->
		<view class="search-history-box" v-else-if="showType === SEARCH_HISTORY"><search-history /></view>
		<!-- 搜索结果 -->
		<view class="search-result-box" v-else><search-result-list /></view>
	</view>
</template>

<script>
import { DefaultText } from '@/api/search.js';
const HOT_LIST = '0'; // 0: 热搜列表
const SEARCH_HISTORY = '1'; // 1：搜索历史
const SEARCH_RESULT = '2'; // 2： 搜索结果

export default {
	data() {
		return {
			// 绑定输入框中的内容
			searchVal: '',
			// 默认的placeholderText
			defaultText: '默认的placeholderText',
			// 展示类型
			HOT_LIST,
			SEARCH_HISTORY,
			SEARCH_RESULT,
			// 展示内容
			showType: HOT_LIST
		};
	},
	created() {
		this.loadDefaultText();
	},
	methods: {
		/**
		 * 获取推荐搜索文本
		 */
		async loadDefaultText() {
			const { data } = await DefaultText();
			this.defaultText = data.defaultText;
		},
		/**
		 * 搜索内容
		 */
		onSearchConfirm(val) {
			// 用户未输入文本，直接搜索时，使用推荐搜索文本
			this.searchVal = val ? val : this.defaultText;
			// 用户输入文本
			if (this.searchVal) {
				this.showType = SEARCH_RESULT;
			}
		},
		// searchbar 获取焦点
		onSearchFocus(val) {
			this.showType = SEARCH_HISTORY;
		},
		/**
		 * searchbar 失去焦点
		 */
		onSearchBlur(val) {},
		/**
		 * searchbar 清空内容
		 */
		onSearchClear() {
			this.showType = SEARCH_HISTORY;
		},
		/**
		 * searchbar 取消按钮
		 */
		onSearchCancel(val) {
			this.showType = HOT_LIST;
		},
		/**
		 *  value 改变时触发事件
		 */
		onSearchInput(val) {
			console.log(val);
		}
	}
};
</script>

<style lang="scss" scoped>
.search-blog-container {
	.search-bar-box {
		position: sticky;
		top: 0px;
		z-index: 9;
		padding: 5px;
	}
}
</style>
