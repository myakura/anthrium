// ==UserScript==
// @name         Anthrium Query Clutter Reducer
// @description  reduces clutter in a URL query
// @match        *://*/*
// @include      *
// ==/UserScript==

(function () {
    var url = location.href,
        re  = /[\?&](?:utm_source|ref|feature|fb_action_ids|context|ob)=.*$/,
        nu  = '';

    if (!location.search) return;

    if (re.test(url)) {
        nu = url.replace(re, '');
        history.replaceState(null, '', nu);
    }
}());
