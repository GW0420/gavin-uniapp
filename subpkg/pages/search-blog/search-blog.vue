<template>
	<view class="search-blog-container">
		<!-- search模块 -->
		<view class="search-bar-box">
			<hot-search
				:searchVal="searchVal"
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
		<view class="search-hot-list-box card" v-if="showType === HOT_LIST">
			<search-hot-list @onSearch="onSearchConfirm" />
		</view>
		<!-- 搜索历史 -->
		<view class="search-history-box" v-else-if="showType === SEARCH_HISTORY">
			<search-history :searchData="searchData" @onItemClick="onSearchConfirm" />
		</view>
		<!-- 搜索结果 -->
		<view class="search-result-box" v-else><search-result-list :queryStr="searchVal" /></view>
	</view>
</template>

<script>
import { DefaultText } from '@/api/search.js';
import { mapState } from 'vuex';

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
			// 搜索历史数据
			// searchData: []
		};
	},
	computed: {
		// 2. 在 computed 中，通过 mapState 函数，注册 state 中的数据，导入之后的数据可直接使用（就像使用 data 中的数据一样）
		// mapState(模块名, ['字段名','字段名','字段名'])
		...mapState('search', ['searchData'])
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
			this.searchVal = val.length > 0 ? val : this.defaultText;
			// 保存搜索历史数据
			this.$store.commit('search/addSearchData', this.searchVal);
			// 切换视图
			if (this.searchVal) {
				this.showType = SEARCH_RESULT;
			}
		},
		/**
		 * 保存搜索历史数据
		 */
		// saveSearchData() {
		// 	// 1. 如果数据已存在，则删除
		// 	const index = this.searchData.findIndex(item => item === this.searchVal);
		// 	if (index > -1) {
		// 		this.searchData.splice(index, 1);
		// 	}
		// 	// 2. 新的搜索内容需要先于旧的搜索内容展示
		// 	this.searchData.unshift(this.searchVal);
		// },
		/**
		 * searchbar 获取焦点
		 */
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
		onSearchInput(val) {},
		/**
		 * 删除数据
		 */
		onRemoveSearchData(index) {
			this.searchData.splice(index, 1);
		},
		onRemoveAllSearchData() {
			this.searchData = [];
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
		height: 50px;
		background: #fff;
		box-shadow: 2px 2px 5px 1px rgba(143, 143, 143, 0.1);
	}
	.search-hot-list-box {
		margin-top: 20px;
	}
}
</style>
