import * as types from './mutation-types'

const mutations = {
  [types.SET_AUTHOR] (state, author) {
    state.author = author
  }
}

export default mutations
