import * as types from './mutation-types'

const mutations = {
  [types.SET_AUTHOR] (state, author) {
    state.author = author
  },
  [types.SET_SEARCH_HISTORY] (state, history) {
    state.searchHistory = history
  }
}

export default mutations
