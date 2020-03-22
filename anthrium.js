'use strict';

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
  'CMP',
]);

const updateHash = hashString => {
  return hashString.replace(/#Echobox=\d+/, '');
};

const rewriteURL = urlString => {
  const url = new URL(urlString);
  if (url.search) {
    const searchParams = url.searchParams;
    for (let key of searchParams.keys()) {
      if (annoyingQueryKeys.has(key)) {
        searchParams.delete(key);
      }
    }
  }
  if (url.hash) {
    url.hash = updateHash(url.hash);
  }
  const newPath = location.pathname + url.search + url.hash;
  history.replaceState(null, '', newPath);
};

rewriteURL(location.href);
