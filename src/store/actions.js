import * as types from './mutation-types'
import { saveSearch, deleteSearch, clearSearch, saveFavorite, deleteFavorite, saveLogin } from '../common/js/cache'

export const saveSearchHistory = function ({ commit }, query) {
  commit(types.SET_SEARCH_HISTORY, saveSearch(query))
}

export const deleteSearchHistory = function ({ commit }, query) {
  commit(types.SET_SEARCH_HISTORY, deleteSearch(query))
}

export const clearSearchHistory = function ({ commit }) {
  commit(types.SET_SEARCH_HISTORY, clearSearch())
}

export const saveFavoriteList = function ({ commit }, article) {
  commit(types.SET_FAVORITE_LIST, saveFavorite(article))
}

export const deleteFavoriteList = function ({ commit }, article) {
  commit(types.SET_FAVORITE_LIST, deleteFavorite(article))
}

export const saveLoginState = function ({ commit }, val) {
  commit(types.SET_LOGIN_STATE, saveLogin(val))
}
