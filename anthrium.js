'use strict'

const annoyingQueryKeys = new Set([
  'utm_source',
  'utm_campaign',
  'utm_medium',
  'utm_content',
  'utm_term',
  'utm_int',
  'ref',
  'feature',
  'fb_action_ids',
  'context',
  'ob',
  'fromid',
  'pk_campaign',
  'pk_kwd',
])

const rewriteURL = urlString => {
  const url = new URL(urlString)
  if (!url.search) { return }
  const searchParams = url.searchParams
  for (let key of searchParams.keys()) {
    if (annoyingQueryKeys.has(key)) {
      searchParams.delete(key)
    }
  }
  const newQuery = searchParams.toString() ? `?${searchParams.toString()}` : ''
  const newPath = location.pathname + newQuery + location.hash
  history.replaceState(null, '', newPath)
}

rewriteURL(location.href)