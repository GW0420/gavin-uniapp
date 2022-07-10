<template>
	<!-- 
	 hot-tabs 是一个通用的轮子
	 1.可以在父组件中定制样式
	 2.可以在父组件中指定数据
	 3.可以在父组件中设置默认激活项
	 -->
	<view class="tab-container">
		<view class="tab-box">
			<scroll-view id="_scroll" class="scroll-view" scroll-x scroll-with-animation :scroll-left="scrollLeft">
				<view class="scroll-content">
					<view class="tab-item-box">
						<block v-for="(item, index) in tabData" :key="index">
							<view
								:id="'_tab_' + index"
								:class="['tab-item', { 'tab-color': activeIndex === index }]"
								:style="{
									color: activeIndex === index ? defaultConfig.activeTextColor : defaultConfig.textColor
								}"
								@click="onTabsClick(index)"
							>
								{{ item.label || item }}
							</view>
						</block>
					</view>
					<!-- 滑块 -->
					<view
						class="underline"
						:style="{
							transform: 'translateX(' + slider.left + 'px)',
							width: defaultConfig.underLineWidth + 'px',
							height: defaultConfig.underLineHeight + 'px',
							background: defaultConfig.underLineColor
						}"
					></view>
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
			activeIndex: -1,
			// 滑块
			// 想要实现滑块的滚动：
			// 1.确定滚动的时机 -> 点击tab时
			// 2.计算滑块滚动的距离
			slider: {
				left: 0
			},
			// 内部维护的数据对象，为每个 item 单独额外维护一个 slider 的滑块对象
			tabList: [],
			// 默认配置
			defaultConfig: {
				// 默认的字体颜色
				textColor: '#333333',
				// 高亮字体颜色
				activeTextColor: '#f94d2a',
				// 下划线宽度 px
				underLineWidth: 24,
				// 下划线高度 px
				underLineHeight: 2,
				// 下划线颜色
				underLineColor: '#f94d2a'
			},
			// scrollView 的横向滚动条位置
			scrollLeft: 0
		};
	},
	methods: {
		onTabsClick(index) {
			this.activeIndex = index;
			this.tabToIndex();
			// 发送通知
			this.$emit('tabClick', index);
		},
		// 根据当前的 activeIndex 下标，计算 【滑块】 滚动位置
		tabToIndex() {
			if (this.tabList.length === 0) return;
			// 获取当前的 activeIndex
			const activeIndex = this.activeIndex;
			// 滑块的宽度
			const underLineWidth = this.defaultConfig.underLineWidth;
			// 配置 滚动条 的数据
			this.slider = {
				// TODO：left 如何定义呢？
				// 1. 维护一个单独的数据对象 `tabList`
				// 2. 在 `tabList`  的 `item` 中为一个 `_slider` 属性
				// 3. 该属性保存了 【当前 `item` 下 的滑块位置】
				//    3.1. 计算公式：`滑块左侧位置 = item.left + (item.width - slider.width) / 2`
				left: this.tabList[activeIndex]._slider.left
			};
			// 控制scrollView 进行横向的滚动
			this.scrollLeft = this.activeIndex * this.defaultConfig.underLineWidth;
		},
		// 更新 tab item 的宽度
		updateTabWidth() {
			// 为 tabList 的每个 item 单独额外维护一个 slider 的滑块对象
			let data = this.tabList;
			if (data.length == 0) return false;
			// 获取 dom 的固定写法
			const query = uni.createSelectorQuery().in(this);
			// 循环数据源
			data.forEach((item, index) => {
				// 获取 dom 的固定写法
				query
					.select('#_tab_' + index)
					.boundingClientRect(res => {
						// 为数据对象中每一个 item 都维护一个 _slider（滑动条） 对象
						item._slider = {
							// 当前的 tab 距离左侧的距离
							left: res.left + (res.width - this.defaultConfig.underLineWidth) / 2
						};
						// 运算完成之后，执行一次 【滑块】位置运算
						if (data.length - 1 === index) {
							this.tabToIndex();
						}
					})
					.exec();
			});
		}
	},
	watch: {
		// 监听 tabData 的变化
		tabData: {
			// 当 tabData 发生变化时, 回调的方法
			handler(val) {
				this.tabList = val;
				setTimeout(() => {
					this.updateTabWidth();
				}, 0);
			},
			// 当前的 handler 回调将会在侦听开始之后被立即调用
			immediate: true
		},
		// 监听激活项目的变化
		defaultIndex: {
			handler(val) {
				this.activeIndex = val;
			},
			// 该回调将会在侦听开始之后被立即调用
			immediate: true
		},
		// 监听 config
		config: {
			handler(val) {
				this.defaultConfig = { ...this.defaultConfig, ...val };
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
				.underline {
					height: 2px;
					width: 25px;
					background-color: #f01414;
					border-radius: 3px;
					transition: 0.5s;
					position: absolute;
					bottom: 0;
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
