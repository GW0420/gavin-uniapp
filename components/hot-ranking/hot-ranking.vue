<template>
	<view class="ranking">
		<image class="ranking-bg" src="@/static/images/ranking-1.png" />
		<text class="ranking-text">1</text>
	</view>
</template>

<script>
export default {
	name: 'hot-ranking'
};
</script>

<style lang="scss" scoped>
.ranking {
	position: relative;
	text-align: center;
	width: 18px;
	height: 20px;
	.ranking-bg {
		width: 100%;
		height: 100%;
	}
	.ranking-text {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-55%, -55%);
		font-size: 12px;
		font-weight: bold;
		color: #333;
	}
	.text-white {
		color: #fff;
	}
}
</style>
