<template>
	<view class="my-search-container">
		<!-- 搜索按钮 -->
		<view class="my-search-box">
			<image class="icon" src="@/static/images/search.png" />
			<text class="placeholder">{{ placeholderText }}</text>
		</view>
	</view>
</template>

<script>
export default {
	name: 'hot-search',
	props: {
		placeholderText: {
			type: String,
			default: '搜索'
		}
	},
	data() {
		return {};
	}
};
</script>

<style lang="scss" scoped>
.my-search-container {
	display: flex;
	align-items: center;
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
