<template>
	<!-- 
	 hot-tabs 是一个通用的轮子
	 1.可以在父组件中定制样式
	 2.可以在父组件中指定数据
	 3.可以在父组件中设置默认激活项
	 -->
	<view class="tab-container">
		<view class="tab-box">
			<scroll-view id="_scroll" class="scroll-view" scroll-x scroll-with-animation>
				<view class="scroll-content">
					<view class="tab-item-box">
						<block v-for="(item, index) in tabData" :key="index">
							<view
								:class="['tab-item', { 'tab-color': activeIndex === index }]"
								@click="onTabsClick(index)"
							>
								{{ item.label || item }}
							</view>
						</block>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
export default {
	name: 'hot-tabs',
	props: {
		// 1.可以在父组件中定制样式
		// 配置对象
		config: {
			type: Object,
			// default 如果是引用数据类型， 那么需要指定 value为一个函数， 通过 返回值的形式 执行默认值
			default: () => {
				return {};
			}
		},
		// 2.可以在父组件中指定数据
		tabData: {
			type: Array,
			default: () => {
				return [];
			}
		},
		// 3.可以在父组件中设置默认激活项
		defaultIndex: {
			type: Number,
			default: 0
		}
	},
	data() {
		return {
			// 当前激活项的 index
			activeIndex: -1
		};
	},
	methods: {
		onTabsClick(index) {
			this.activeIndex = index;
			// 发送通知
			this.$emit('tabClick', index);
		}
	},
	watch: {
		// 监听激活项目的变化
		defaultIndex: {
			handler(val) {
				console.log(val);
				this.activeIndex = val;
			},
			// 该回调将会在侦听开始之后被立即调用
			immediate: true
		}
	}
};
</script>

<style lang="scss">
.tab-container {
	font-size: 14px;
	height: 45px;
	line-height: 45px;
	background-color: #f7f7f7;
	.tab-box {
		width: 100%;
		height: 45px;
		display: flex;
		position: relative;
		.scroll-view {
			white-space: nowrap;
			width: 100%;
			height: 100%;
			box-sizing: border-box;
			.scroll-content {
				width: 100%;
				height: 100%;
				position: relative;
				.tab-item-box {
					height: 100%;
					.tab-item {
						height: 100%;
						display: inline-block;
						text-align: center;
						padding: 0 15px;
						position: relative;
						text-align: center;
						&.tab-color {
							color: #f94d2a;
						}
					}
				}
			}
		}
	}
}

scroll-view ::-webkit-scrollbar {
	width: 0;
	height: 0;
	background-color: transparent;
}
</style>
