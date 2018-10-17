import {loadSearch, loadFavorite, loadColumnist, loadLogin} from '../common/js/cache'

const state = {
  author: {},
  searchHistory: loadSearch(),
  favoriteList: loadFavorite(),
  favoriteColumnist: loadColumnist(),
  loginState: loadLogin()
}

export default state
