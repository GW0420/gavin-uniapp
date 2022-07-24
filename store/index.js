import Vue from 'vue';
import Vuex from 'vuex';
import search from './modules/search';
import getters from './getter'

Vue.use(Vuex);


const store = new Vuex.Store({
	getters,
	modules: {
		search
	}
});
export default store;
