// import './mock';
import './eventBus';
import './styles/global.less';
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import { showMessage } from './utils';
import Vloading from './directives/loading';
import Vlazy from './directives/lazy';

Vue.config.productionTip = false;

store.dispatch('setting/fetchSetting');
Vue.prototype.$showMessage = showMessage;

Vue.directive('loading', Vloading);
Vue.directive('lazy', Vlazy);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
