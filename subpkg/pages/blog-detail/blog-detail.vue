<template>
	<page-meta root-font-size="52px">
		<view class="detail-container">
			<!-- 文章内容区域 -->
			<block v-if="articleData">
				<!-- 标题 -->
				<view class="title">{{ articleData.articleTitle }}</view>
				<view class="detail-info">
					<view class="detail-left">
						<view class="avatar-box">
							<!-- 头像 -->
							<image class="avatar" :src="articleData.avatar"></image>
						</view>
						<view class="author-box">
							<!-- 作者 -->
							<text class="author">{{ articleData.nickName }}</text>
							<!-- 发布时间 -->
							<text class="release-time">{{ articleData.date }}</text>
						</view>
					</view>
					<view class="detail-right">
						<!-- 关注按钮 -->
						<button class="follow" size="mini">关注</button>
					</view>
				</view>
				<!-- 文章内容 -->
				<mp-html class="markdown_views" :content="addClassFromHTML(articleData.content)" scroll-table />
				<!-- 评论列表 -->
				<!-- 1. 给 mescroll-body 的组件添加：ref="mescrollItem"（mescrollItem 是固定的不可以变化） -->
				<view class="comment-box"><article-comment-list ref="mescrollItem" :articleId="articleId" /></view>
			</block>
		</view>
	</page-meta>
</template>

<script>
import { ArticleDetail } from '@/api/article.js';
import mpHtml from '@/uni_modules/mp-html/components/mp-html/mp-html';
// 2. 引入 mescroll-comp.js
import MescrollCompMixin from '@/uni_modules/mescroll-uni/components/mescroll-uni/mixins/mescroll-comp.js';

export default {
	// 3. 注册 mixins
	mixins: [MescrollCompMixin],
	components: {
		mpHtml
	},
	data() {
		return {
			// 作者名
			author: '',
			// 文章 ID
			articleId: '',
			// 文章详情数据
			articleData: null
		};
	},
	onLoad(options) {
		this.author = options.author;
		this.articleId = options.articleId;
		this.loadArticleDetail();
	},
	methods: {
		/**
		 * 获取文章详情数据
		 */
		async loadArticleDetail() {
			// 展示加载框
			uni.showLoading({
				title: '加载中'
			});
			const { data: res } = await ArticleDetail({
				author: this.author,
				articleId: this.articleId
			});
			this.articleData = res.data;
			// 关闭加载
			uni.hideLoading();
		},
		addClassFromHTML(info) {
			return info
				.replace(/<p>/gi, '<p class="p-cls">')
				.replace(/<a>/gi, '<a class="a-cls">')
				.replace(/<h1>/gi, '<h1 class="h1-cls">')
				.replace(/<h2>/gi, '<h2 class="h2-cls">')
				.replace(/<h3>/gi, '<h3 class="h3-cls">')
				.replace(/<h4>/gi, '<h4 class="h4-cls">')
				.replace(/<h5>/gi, '<h5 class="h5-cls">')
				.replace(/<h6>/gi, '<h6 class="h6-cls">')
				.replace(/<ul>/gi, '<ul class="ul-cls">')
				.replace(/<li>/gi, '<li class="li-cls">')
				.replace(/<ol>/gi, '<ol class="ol-cls">')
				.replace(/<td>/gi, '<td class="td-cls">')
				.replace(/<th>/gi, '<th class="th-cls">')
				.replace(/<tr>/gi, '<tr class="tr-cls">')
				.replace(/<dl>/gi, '<dl class="dl-cls">')
				.replace(/<dd>/gi, '<dd class="dd-cls">')
				.replace(/<hr>/gi, '<hr class="hr-cls">')
				.replace(/<pre>/gi, '<pre class="pre-cls">')
				.replace(/<strong>/gi, '<strong class="strong-cls">')
				.replace(/<input>/gi, '<input class="input-cls">')
				.replace(/<table>/gi, '<table class="table-cls">')
				.replace(/<details>/gi, '<details class="details-cls">')
				.replace(/<code>/gi, '<code class="code-cls">')
				.replace(/<kbd>/gi, '<kbd class="kbd-cls">')
				.replace(/<summary>/gi, '<summary class="summary-cls">')
				.replace(/<blockquote>/gi, '<blockquote class="blockquote-cls">')
				.replace(/<img/gi, '<img class="img-cls"');
		}
	}
};
</script>

<style lang="scss" scoped>
.detail-container {
	padding: 8px 10px;
	.title {
		font-size: 20px;
		color: #000;
		font-weight: bold;
	}
	.detail-info {
		padding: 8px 0;
		display: flex;
		justify-content: space-between;

		.detail-left {
			display: flex;
			.author-box {
				margin-left: 10px;
				display: flex;
				flex-direction: column;
				.author {
					font-size: 14px;
					font-weight: bold;
					color: #2c405a;
				}
				.release-time {
					font-size: 14px;
					color: #999;
				}
			}
		}

		.detail-right {
			display: flex;
			align-items: center;
		}
	}
}
</style>
