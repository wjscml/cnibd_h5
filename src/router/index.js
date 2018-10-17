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

const Login = (resolve) => {
  import('../pages/login/login.vue').then((module) => {
    resolve(module)
  })
}

const Register = (resolve) => {
  import('../pages/register/register.vue').then((module) => {
    resolve(module)
  })
}

const Forget = (resolve) => {
  import('../pages/forget/forget.vue').then((module) => {
    resolve(module)
  })
}

const Agreement = (resolve) => {
  import('../pages/agreement/agreement.vue').then((module) => {
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

const Favor = (resolve) => {
  import('../pages/favor/favor.vue').then((module) => {
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
        title: '赛恩财经 - 聚合财经新媒体'
      }
    },
    {
      path: '/login',
      component: Login,
      meta: {
        title: '登录 - 赛恩财经'
      }
    },
    {
      path: '/register',
      component: Register,
      meta: {
        title: '注册 - 赛恩财经'
      }
    },
    {
      path: '/forget',
      component: Forget,
      meta: {
        title: '找回密码 - 赛恩财经'
      }
    },
    {
      path: '/agreement',
      component: Agreement,
      meta: {
        title: '用户注册协议 - 赛恩财经'
      }
    },
    {
      path: '/favor',
      component: Favor,
      meta: {
        title: '我的收藏 - 赛恩财经'
      }
    },
    {
      path: '/site/:id',
      component: NewsDetail
    },
    {
      path: '/columnist',
      component: Columnist,
      meta: {
        title: '专栏作者 - 赛恩财经'
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
        title: '搜索 - 赛恩财经'
      }
    },
    {
      path: '/tool',
      component: Tool,
      meta: {
        title: '个税计算器 - 赛恩财经'
      }
    },
    {
      path: '/about',
      component: About,
      meta: {
        title: '关于我们 - 赛恩财经'
      }
    },
    {
      path: '/calculator',
      redirect: '/index',
      component: Calculator,
      meta: {
        title: '赛恩财经 - 聚合财经新媒体'
      }
    },
    {
      path: '*',
      component: NotFound
    }
  ]
})
