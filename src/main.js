import Vue from 'vue';
import App from './App.vue';

Vue.config.productionTip = false;

// Mockdata
// import './mock';

// Utils
import FastClick from 'fastclick';
FastClick.attach(document.body);

// Router & Store
import store from './store';
import router from './router';
import {sync} from 'vuex-router-sync';
sync(store, router);

// Mixins
import './mixins'

//raven
import Raven from 'raven-js';
import RavenVue from 'raven-js/plugins/vue';
Raven
  .config('http://d6a3b3f4a8cd4617bef21bfb6ca63216@111.231.65.183:9000/25')
  .addPlugin(RavenVue, Vue)
  .install();

// Components
Vue.component('XInput', require('./components/Forms/x-input.vue'))
Vue.component('XTextarea', require('./components/Forms/x-textarea.vue'))
Vue.component('XSwitch', require('./components/Forms/x-switch.vue'))
Vue.component('XRadio', require('./components/Forms/x-radio.vue'))
Vue.component('XCheckbox', require('./components/Forms/x-checkbox.vue'))
Vue.component('Actionsheet', require('./components/Layers/actionsheet.vue'))
Vue.component('Dialog', require('./components/Layers/dialog.vue'))
Vue.component('Toast', require('./components/Layers/toast.vue'))
Vue.component('popup', require('./components/Layers/popup/index.vue'))
Vue.component('Group', require('./components/List/group.vue'))
Vue.component('Cell', require('./components/List/cell.vue'))
Vue.component('Link', require('./components/List/link.vue'))
Vue.component('Grids', require('./components/Layouts/grids/girds.vue'))
Vue.component('Grid', require('./components/Layouts/grids/grid.vue'))
Vue.component('Tab', require('./components/Layouts/tab/tab.vue'))
Vue.component('TabItem', require('./components/Layouts/tab/tabItem.vue'))
Vue.component('Scroller', require('./components/Layouts/scroller.vue'))
Vue.component('XButton', require('./components/Displays/button.vue'))
Vue.component('calendar', require('./components/Functional/calendar'))
Vue.component('Checker', require('./components/Functional/checker/checker.vue'));
Vue.component('CheckerItem', require('./components/Functional/checker/checker-item.vue'));
Vue.component('Search', require('./components/Functional/search'));
Vue.component('Progress', require('./components/Layers/progress.vue'));

/* eslint-disable no-new */
new Vue({
  store,
  router,
  el: '#app',
  template: '<App/>',
  components: {App}
});
