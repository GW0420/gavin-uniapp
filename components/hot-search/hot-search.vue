<template>
	<view class="my-search-container">
		<!-- 搜索输入框 -->
		<uni-search-bar
			class="my-search-bar"
			v-if="isShowInput"
			:radius="100"
			:bgColor="config.backgroundColor"
			:placeholder="placeholderText"
			:value="searchVal"
			@confirm="onSearch"
			@focus="onFocus"
			@blur="onBlur"
			@clear="onClear"
			@cancel="onCancel"
			@input="onInput"
		>
			<uni-icons slot="clearIcon" type="clear" color="#999999" />
		</uni-search-bar>
		<!-- 搜索按钮 -->
		<view class="my-search-box" v-else>
			<image class="icon" src="@/static/images/search.png" />
			<text class="placeholder">{{ placeholderText }}</text>
		</view>
	</view>
</template>

<script>
export default {
	name: 'hot-search',
	props: {
		// 默认内容
		placeholderText: {
			type: String,
			default: '搜索'
		},
		// 是否显示输入框
		isShowInput: {
			type: Boolean,
			default: false
		},
		// 配置对象
		config: {
			type: Object,
			default: () => ({
				height: 36,
				backgroundColor: '#ffffff',
				icon: '/static/images/search.png',
				textColor: '#454545',
				border: '1px solid #c9c9c9'
			})
		},
		// 输入的内容
		searchVal: {
			type: String
		}
	},
	data() {
		return {};
	},
	methods: {
		/**
		 * 点击搜索按钮触发
		 */
		onSearch() {
			this.$emit('search', this.searchVal);
		},
		/**
		 * 输入框获取焦点触发
		 */
		onFocus() {
			this.$emit('focus', this.searchVal);
		},
		/**
		 * 输入框失去焦点触发
		 */
		onBlur() {
			this.$emit('blur', this.searchVal);
		},
		/**
		 * 点击输入框中的清空按钮时
		 */
		onClear() {
			this.$emit('clear', this.searchVal);
		},
		/**
		 * 点击取消按钮时
		 */
		onCancel() {
			this.$emit('cancel', this.value);
		},
		/**
		 *  value 改变时触发事件
		 */
		onInput(val) {
			this.$emit('input', val);
		}
	}
};
</script>

<style lang="scss" scoped>
.my-search-container {
	display: flex;
	align-items: center;
	.my-search-bar {
		width: 100%;
	}
	.my-search-box {
		height: 36px;
		width: 100%;
		background-color: #ffffff;
		border-radius: 15px;
		border: 1px solid #c9c9c9;
		display: flex;
		align-items: center;
		padding: 0 10px;
		.icon {
			width: 15px;
			height: 15px;
		}
		.placeholder {
			font-size: 10px;
			margin-left: 10px;
			color: #454545;
		}
	}
}
</style>
