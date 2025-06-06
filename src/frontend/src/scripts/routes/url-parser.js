const UrlParser = {
  parseActiveUrlWithCombiner() {
    const url = window.location.hash.slice(1).toLowerCase();
    return this._urlCombiner(url);
  },

  parseActiveUrlWithoutCombiner() {
    const url = window.location.hash.slice(1).toLowerCase();
    return this._urlSplitter(url);
  },

  _urlSplitter(url) {
    const urlsSplits = url.split('/');
    return {
      resource: urlsSplits[1] || null,
      id: urlsSplits[2] || null,
      verb: urlsSplits[3] || null,
    };
  },

  _urlCombiner(url) {
    // Jika URL kosong, kembalikan root
    if (!url) return '/';
    
    const splitedUrl = this._urlSplitter(url);
    return splitedUrl.resource ? `/${splitedUrl.resource}` : '/';
  },
};

export default UrlParser;
