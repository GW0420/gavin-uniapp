<template>
	<view class="hot-container">
		<!-- logo -->
		<image class="logo" src="@/static/images/logo.png" mode="aspectFit"></image>
		<view class="search-box">
			<!-- 搜索模块 -->
			<hot-search placeholderText="uni-app 自定义组件" />
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {};
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
