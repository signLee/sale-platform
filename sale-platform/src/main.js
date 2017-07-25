// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import IndexPage from './pages/index.vue'
import DetailPage from './pages/detail.vue'
import Layout from './components/layout/layout.vue'
import Count from './pages/detail/count.vue'
import Forecast from './pages/detail/forecast.vue'
import Analysis from './pages/detail/analysis.vue'
import Publish from './pages/detail/publish.vue'
import OrderList from './pages/orderList.vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
Vue.use(VueRouter)
Vue.use(VueResource)

Vue.config.productionTip = false
let router=new VueRouter({
  mode:'history',
    routes:[
      {
        path:'/',
        component:IndexPage
      },
      {
        path:'/orderList',
        component:OrderList
      },
      {
        path:'/detail',
        component:DetailPage,
        redirect:'/detail/analysis',
        children:[
          {
            path:'count',
            component:Count,
          },
          {
            path:'forecast',
            component:Forecast,
          },
          {
            path:'analysis',
            component:Analysis,
          },
          {
            path:'publish',
            component:Publish,
          }
        ]
      }
    ]
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<Layout/>',
  components: { Layout }
})
