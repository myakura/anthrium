class AnthriumContent {
  annoyingQueryKeys = new Set([
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

  constructor() {
    this.url = new URL(location.href);
    this.updateURL();
  }

  updateSearchParams() {
    for (const key of this.url.searchParams.keys()) {
      if (this.annoyingQueryKeys.has(key)) {
        this.url.searchParams.delete(key);
      }
    }
  }

  updateFragment() {
    if (/#Echobox=\d+/.test(this.url.hash)) {
      this.url.hash = this.url.hash.replace(/#Echobox=\d+/, '');
    }
  }

  updateURL() {
    this.updateSearchParams();
    this.updateFragment();

    history.replaceState(null, '', this.url.pathname);
  }
}

new AnthriumContent();