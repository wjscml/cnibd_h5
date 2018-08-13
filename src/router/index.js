import Vue from 'vue'
import Router from 'vue-router'
import Index from '../pages/index/index.vue'
import About from '../pages/about/about.vue'
import NewsDetail from '../pages/news-detail/news-detail.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/index'
    },
    {
      path: '/index',
      component: Index
    },
    {
      path: '/about',
      component: About
    },
    {
      path: '/site/:id',
      component: NewsDetail
    }
  ]
})
