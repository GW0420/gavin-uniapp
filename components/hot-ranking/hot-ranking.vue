<template>
	<view class="ranking">
		<image class="ranking-bg" :src="getRankingBg" />
		<text :class="['ranking-text', { 'text-white': ranking <= 3 }]">{{ ranking }}</text>
	</view>
</template>

<script>
export default {
	name: 'hot-ranking',
	props: {
		ranking: {
			type: Number,
			required: true
		}
	},
	//当依赖值发生变化时，会重新计算
	computed: {
		getRankingBg() {
			if (this.ranking <= 3) {
				return require(`@/static/images/ranking-${this.ranking}.png`);
			}
			return require('@/static/images/ranking-other.png');
		}
	}
};
</script>

<style lang="scss" scoped>
.ranking {
	position: relative;
	text-align: center;
	width: 25px;
	height: 25px;
	.ranking-bg {
		width: 100%;
		height: 100%;
	}
	.ranking-text {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-55%, -55%);
		font-size: 10px;
		font-weight: bold;
		text-align: center;
		color: #333;
	}
	.text-white {
		color: #fff;
	}
}
</style>
