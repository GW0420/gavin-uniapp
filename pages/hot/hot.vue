<template>
	<view class="hot-container">
		<!-- logo -->
		<image class="logo" src="@/static/images/logo.png" mode="aspectFit"></image>
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
}
</style>
