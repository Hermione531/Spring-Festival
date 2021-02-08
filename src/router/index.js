import Vue from 'vue'
import Router from 'vue-router'
import Homepage from '@/components/Homepage'
import Login from '@/components/Login'
import ActivitySwiper from '@/components/ActivitySwiper'
import ActivityComplete from '@/components/ActivityComplete'
import ActivityEnd from '@/components/ActivityEnd'
import ActivityTheme from '@/components/ActivityTheme'


Vue.use(Router)

const routes = [
  {path: '/login', component: Login},
  // {path: '/home', component: Homepage},
  {path: '/activity', component: ActivitySwiper},
  {path: '/complete', component: ActivityComplete},
  {path: '/end', component: ActivityEnd},
  {path: '/', component: Login},
  {path: '/theme', component: ActivityTheme},
]


export default new Router({
  // mode: 'history',
  routes
})
