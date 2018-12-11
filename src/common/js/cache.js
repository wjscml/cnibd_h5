import storage from 'good-storage'

const SEARCH_KEY = '__search__'
const SEARCH_MAX_LEN = 15

const LOGIN_KEY = '__login__'

const FAVORITE_KEY = '__favorite__'
const FAVORITE_MAX_LENGTH = 100

const NEWSLIST_KEY = '__newslist__'
const TYPE_KEY = '__type__'
const SCROLL_HEIGHT_KEY = '__height__'

const COLUMNIST_KEY = '__columnist__'
const COLUMNIST_HEIGHT_KEY = '__columnistHeight__'

function insertArray (arr, val, compare, maxLen) {
  const index = arr.findIndex(compare)
  if (index === 0) {
    return
  }
  if (index > 0) {
    arr.splice(index, 1)
  }
  arr.unshift(val)
  if (maxLen && arr.length > maxLen) {
    arr.pop()
  }
}

function deleteFromArray (arr, compare) {
  const index = arr.findIndex(compare)
  if (index > -1) {
    arr.splice(index, 1)
  }
}

export function saveSearch (query) {
  let searches = storage.get(SEARCH_KEY, [])
  insertArray(searches, query, (item) => {
    return item === query
  }, SEARCH_MAX_LEN)
  storage.set(SEARCH_KEY, searches)
  return searches
}

export function loadSearch () {
  return storage.get(SEARCH_KEY, [])
}

export function deleteSearch (query) {
  let searches = storage.get(SEARCH_KEY, [])
  deleteFromArray(searches, (item) => {
    return item === query
  })
  storage.set(SEARCH_KEY, searches)
  return searches
}

export function clearSearch () {
  storage.remove(SEARCH_KEY)
  return []
}

export function saveFavorite (article) {
  let articles = storage.get(FAVORITE_KEY, [])
  insertArray(articles, article, (item) => {
    return article.id === item.id
  }, FAVORITE_MAX_LENGTH)
  storage.set(FAVORITE_KEY, articles)
  return articles
}

export function deleteFavorite (article) {
  let articles = storage.get(FAVORITE_KEY, [])
  deleteFromArray(articles, (item) => {
    return article.id === item.id
  })
  storage.set(FAVORITE_KEY, articles)
  return articles
}

export function loadFavorite () {
  return storage.get(FAVORITE_KEY, [])
}

// 首页新闻列表
export function saveNewslist (news) {
  storage.set(NEWSLIST_KEY, news)
  return news
}

export function removeNewslist () {
  storage.remove(NEWSLIST_KEY)
  return []
}

export function loadNewslist () {
  return storage.get(NEWSLIST_KEY, [])
}

export function saveType (type) {
  storage.set(TYPE_KEY, type)
  return type
}

export function loadType () {
  return storage.get(TYPE_KEY, [])
}

export function saveScrollHeight (height) {
  storage.set(SCROLL_HEIGHT_KEY, height)
  return height
}

export function loadScrollHeight () {
  return storage.get(SCROLL_HEIGHT_KEY, [])
}

// columnist
export function saveColumnist (columnist) {
  storage.set(COLUMNIST_KEY, columnist)
  return columnist
}

export function loadColumnist () {
  return storage.get(COLUMNIST_KEY, [])
}

export function saveColumnistHeight (height) {
  storage.set(COLUMNIST_HEIGHT_KEY, height)
  return height
}

export function loadColumnistHeight () {
  return storage.get(COLUMNIST_HEIGHT_KEY, [])
}

// login
export function saveLogin (data) {
  storage.set(LOGIN_KEY, data)
  return data
}

export function loadLogin () {
  return storage.get(LOGIN_KEY, [])
}
