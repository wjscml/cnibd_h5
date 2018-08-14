import Vue from 'vue'
import Router from 'vue-router'
import Title from 'vue-wechat-title'

Vue.use(Router)
Vue.use(Title)

const Index = (resolve) => {
  import('../pages/index/index.vue').then((module) => {
    resolve(module)
  })
}

const About = (resolve) => {
  import('../pages/about/about.vue').then((module) => {
    resolve(module)
  })
}

const NewsDetail = (resolve) => {
  import('../pages/news-detail/news-detail.vue').then((module) => {
    resolve(module)
  })
}

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
