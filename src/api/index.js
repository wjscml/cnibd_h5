import { postApi } from './helpers'

const getLogin = postApi('user.login')
const getRegister = postApi('user.register')
const getForget = postApi('user.retrievePassword')
const getCaptcha = postApi('user.getCaptcha')
const getMobileCode = postApi('user.getMobileCode')
const getWxLogin = postApi('user.wxLogin')
const getSlider = postApi('web.getIndexHeader')
const getCategories = postApi('article.categories')
const getNewsList = postApi('article.getList')
const getNewsDetail = postApi('article.getDetail')
const getColumnist = postApi('user.getAuthorList')
const getColumnistAuthor = postApi('user.authorPublish')
const collectArticle = postApi('article.keep')
const focusAuthor = postApi('user.follow')
const getSearchList = postApi('article.getSearchList')
const getCollectList = postApi('article.getKeepList')
const getFocusList = postApi('user.getFollowAuthorList')
const getAbout = postApi('site.about')
const getSign = postApi('site.sign')

export {
  getLogin,
  getRegister,
  getForget,
  getCaptcha,
  getMobileCode,
  getWxLogin,
  getSlider,
  getCategories,
  getNewsList,
  getNewsDetail,
  getColumnist,
  getColumnistAuthor,
  collectArticle,
  focusAuthor,
  getSearchList,
  getCollectList,
  getFocusList,
  getAbout,
  getSign
}
