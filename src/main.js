// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import VueLazyLoad from 'vue-lazyload'
import {loadLogin} from './common/js/cache'

Vue.config.productionTip = false

Vue.use(VueLazyLoad, {
  loading: require('./common/image/newsBg.png')
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

router.beforeEach((to, from, next) => {
  if (to.meta.isLogin) {
    let errorCode = loadLogin().errorCode
    if (errorCode === '0') {
      next()
    } else {
      alert('请先登录')
      next({
        path: '/login'
      })
    }
  } else {
    next()
  }
})

router.afterEach((to, from, next) => {
  window.scrollTo(0, 0)
})
