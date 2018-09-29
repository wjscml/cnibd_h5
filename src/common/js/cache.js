import storage from 'good-storage'

const SEARCH_KEY = '__search__'
const SEARCH_MAX_LEN = 15

const FAVORITE_KEY = '__favorite__'
const FAVORITE_MAX_LENGTH = 100

const FAVORITE_COLUMNIST_KEY = '__columnist__'
const FAVORITE_COLUMNIST_MAX_LENGTH = 100

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

export function saveColumnist (author) {
  let authors = storage.get(FAVORITE_COLUMNIST_KEY, [])
  insertArray(authors, author, (item) => {
    return author.author_id === item.author_id
  }, FAVORITE_COLUMNIST_MAX_LENGTH)
  storage.set(FAVORITE_COLUMNIST_KEY, authors)
  return authors
}

export function deleteColumnist (author) {
  let authors = storage.get(FAVORITE_COLUMNIST_KEY, [])
  deleteFromArray(authors, (item) => {
    return author.author_id === item.author_id
  })
  storage.set(FAVORITE_COLUMNIST_KEY, authors)
  return authors
}

export function loadColumnist () {
  return storage.get(FAVORITE_COLUMNIST_KEY, [])
}
