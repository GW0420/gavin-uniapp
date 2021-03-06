import Vue from 'vue'
import App from './App'

// 通用样式
import './static/styles/global.scss';


Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()

// VUE3
// import {
// 	createSSRApp
// } from 'vue'
// import App from './App.vue'
// export function createApp() {
// 	const app = createSSRApp(App)
// 	return {
// 		app
// 	}
// }
