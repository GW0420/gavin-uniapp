<template>
	<!-- 
	 hot-tabs 是一个通用的轮子
	 1.可以在父组件中定制样式
	 2.可以在父组件中指定数据
	 3.可以在父组件中设置默认激活项
	 -->
	<view></view>
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
		return {};
	}
};
</script>

<style lang="scss"></style>
