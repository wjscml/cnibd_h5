import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueLazyLoad from 'vue-lazyload'
import Title from 'vue-wechat-title'

Vue.config.productionTip = false

Vue.use(VueLazyLoad, {
  loading: require('./common/image/newsBg.png')
})

Vue.use(Title)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

router.afterEach((to, from, next) => {
  window.scrollTo(0, 0)
})
