'use strict'

const annoyingQueryKeys = new Set([
  'utm_source',
  'utm_campaign',
  'utm_medium',
  'utm_content',
  'utm_term',
  'ref',
  'feature',
  'fb_action_ids',
  'context',
  'ob',
  'fromid',
  'pk_campaign',
  'pk_kwd',
])

const getSearchParams = queryString => {
  let queryArray = queryString.slice(1).split('&').map(query => query.split('='))
  return new Map(queryArray)
}

const filterSearchParams = queryMap => {
  let filteredQueries = []
  queryMap.forEach((value, key) => {
    if (!annoyingQueryKeys.has(key)) {
      filteredQueries.push((value !== undefined) ? `${key}=${value}` : key)
    }
  })
  return filteredQueries
}

const rewriteURL = queryString => {
  if (!queryString) { return }
  let filteredQueries = filterSearchParams(getSearchParams(queryString))
  let newQuery = !!filteredQueries.length ? `?${filteredQueries.join('&')}` : ''
  let newURL = location.origin + location.pathname + newQuery + location.hash
  history.replaceState(null, '', newURL)
}

rewriteURL(location.search)