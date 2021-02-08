// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import { Button, PaletteButton, Field, MessageBox, Indicator, Spinner } from 'mint-ui'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
// import vhCheck from 'vh-check';
// vhCheck();
import { PERSON_CODE, ACTIVITY_START, ACTIVITY_END } from './utils/consts';
import { formatDate } from './utils';

Vue.use(VueAwesomeSwiper)

Vue.config.productionTip = false

Vue.component(Button.name, Button);
Vue.component(PaletteButton.name, PaletteButton);
Vue.component(Field.name, Field);
Vue.component(MessageBox.name, MessageBox);
// Vue.component(Indicator.name, Indicator);
Vue.component(Spinner.name, Spinner);
// Vue.user(Indicator)

window.MessageBox = MessageBox;
window.Indicator = Indicator;
window.FormData = FormData;
// Vue.use(Field);


router.beforeEach((to, from, next) => {
  // let now = formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss');
  // if(to.path !== '/' && now < ACTIVITY_START ) {
  //     window.location.href = '/';
  //     return;
  // }
  // if(now > ACTIVITY_END && to.path !== '/end') {
  //   window.location.href = '/end';
  //   return;
  // }

  // 未登录跳转到登录页面
  let personCode = localStorage.getItem(PERSON_CODE);
  if(!personCode && to.path !== '/login' && to.path !== '/theme') {
    next('/login');
  }
  next();
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

