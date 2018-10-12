import {loadSearch, loadFavorite, loadColumnist} from '../common/js/cache'

const state = {
  author: {},
  searchHistory: loadSearch(),
  favoriteList: loadFavorite(),
  favoriteColumnist: loadColumnist(),
  loginState: false
}

export default state
