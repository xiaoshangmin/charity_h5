import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import Vant from 'vant';

import 'vant/lib/index.css';
import 'vant/lib/icon/local.css';
import './assets/css/common.css';

Vue.use(Vant);
axios.defaults.timeout = 10000;  
Vue.prototype.$http = axios
Vue.config.productionTip = false

axios.defaults.baseURL = 'http://charity.wowyou.cc/'

router.beforeEach((to,from,next)=>{
  if(to.meta.title){
    document.title = to.meta.title
  }
  next();
})


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
