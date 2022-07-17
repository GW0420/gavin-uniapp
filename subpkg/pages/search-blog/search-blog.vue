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
	</view>
</template>

<script>
export default {
	data() {
		return {
			// 绑定输入框中的内容
			searchVal: '',
			// 默认的placeholderText
			defaultText: '默认的placeholderText'
		};
	},
	methods: {
		/**
		 * 搜索内容
		 */
		onSearchConfirm(val) {
			console.log('搜索内容：' + this.searchVal);
		},
		// searchbar 获取焦点
		onSearchFocus(val) {
			console.log('searchbar 获取焦点');
		},
		/**
		 *  value 改变时触发事件
		 */
		onSearchInput(val) {
			console.log(val);
		},
		/**
		 * searchbar 失去焦点
		 */
		onSearchBlur(val) {
			console.log('searchbar 失去焦点');
		},
		/**
		 * searchbar 清空内容
		 */
		onSearchClear() {
			console.log('searchbar 清空内容');
		},
		/**
		 * searchbar 取消按钮
		 */
		onSearchCancel(val) {
			console.log('searchbar 取消按钮');
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
