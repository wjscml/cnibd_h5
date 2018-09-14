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

const Columnist = (resolve) => {
  import('../pages/columnist/columnist.vue').then((module) => {
    resolve(module)
  })
}

const Author = (resolve) => {
  import('../pages/columnist-author/columnist-author.vue').then((module) => {
    resolve(module)
  })
}

const NewsDetail = (resolve) => {
  import('../pages/news-detail/news-detail.vue').then((module) => {
    resolve(module)
  })
}

const Search = (resolve) => {
  import('../pages/search/search.vue').then((module) => {
    resolve(module)
  })
}

const Tool = (resolve) => {
  import('../pages/tool/tool.vue').then((module) => {
    resolve(module)
  })
}

const Calculator = (resolve) => {
  import('../pages/tool/calculator.vue').then((module) => {
    resolve(module)
  })
}

const NotFound = (resolve) => {
  import('../pages/not-found/not-found.vue').then((module) => {
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
        title: '赛恩财经:聚合财经新媒体'
      }
    },
    {
      path: '/about',
      component: About,
      meta: {
        title: '赛恩财经——关于我们'
      }
    },
    {
      path: '/columnist',
      component: Columnist,
      meta: {
        title: '赛恩财经——专栏作者'
      },
      children: [
        {
          path: ':id',
          component: Author
        }
      ]
    },
    {
      path: '/search',
      component: Search,
      meta: {
        title: '赛恩财经——关于我们'
      }
    },
    {
      path: '/tool',
      component: Tool,
      meta: {
        title: '赛恩财经——个税计算器'
      }
    },
    {
      path: '/site/:id',
      component: NewsDetail
    },
    {
      path: '/calculator',
      redirect: '/index',
      component: Calculator,
      meta: {
        title: '赛恩财经:聚合财经新媒体'
      }
    },
    {
      path: '*',
      component: NotFound
    }
  ]
})
