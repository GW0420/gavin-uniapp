<template>
	<view class="search-result-item-box">
		<!-- 标题 -->
		<rich-text :nodes="data.title" class="item-title line-clamp-2"></rich-text>
		<!-- 内容区 - 样式 1 -->
		<rich-text :nodes="data.description" class="item-desc line-clamp-2"></rich-text>
		<!-- 底部 -->
		<view class="item-desc-bottom">
			<view class="item-author">{{ data.author }}</view>
			<view class="item-read-num">
				<uni-icons class="read-num-icon" color="#999999" type="compose" />
				<text>{{ data.create_time }}</text>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		data: {
			type: Object,
			required: true
		}
	},
	data: () => ({})
};
</script>

<style lang="scss" scoped>
.search-result-item-box {
	padding: 12px;
	box-shadow: 2px 2px 5px 1px rgba(143, 143, 143, 0.1);
	// 标题
	.item-title {
		font-size: 14px;
		font-weight: bold;
		color: #000;
	}

	.item-desc {
		margin: 15px 0;
		font-size: 14px;
		color: #555;
	}

	// 底部作者 + 阅读量
	.item-desc-bottom {
		margin-top: 8px;
		display: flex;
		color: #999;
		font-size: 12px;
		.item-author {
			margin-right: 12px;
		}
		.item-read-num {
			.read-num-icon {
				color: #999;
				margin-right: 5px;
			}
		}
	}
}
</style>
