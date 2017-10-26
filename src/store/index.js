import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: require('./state'),
  getters: require('./getters'),
  actions: require('./actions'),
  mutations: require('./mutations'),
})
