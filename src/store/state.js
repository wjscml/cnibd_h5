import {loadSearch, loadFavorite, loadLogin} from '../common/js/cache'

const state = {
  author: {},
  searchHistory: loadSearch(),
  favoriteList: loadFavorite(),
  loginState: loadLogin()
}

export default state
