import Vue from 'vue'
import Router from 'vue-router'
import Title from 'vue-wechat-title'
import Index from '../pages/index/index.vue'
import About from '../pages/about/about.vue'
import NewsDetail from '../pages/news-detail/news-detail.vue'

Vue.use(Router)
Vue.use(Title)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/index'
    },
    {
      path: '/index',
      component: Index,
      meta: {
        title: '赛恩财经'
      }
    },
    {
      path: '/about',
      component: About,
      meta: {
        title: '赛恩财经--关于'
      }
    },
    {
      path: '/site/:id',
      component: NewsDetail
    }
  ]
})
