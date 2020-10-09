const requestBase = ''.concat(
  process.env.VUE_APP_API_URL,
  '/api/v0/shortener/'
); // e.g. '/t/myslug';

const pathname = window.location.pathname;
const slug = (pathname.split('/') || '')[2];
console.log(pathname, slug);

if (slug && slug !== 'undefined') {
  getLongUrl(slug)
    .then(function(response) {
      console.log(response);
      const longUrl = response.url;
      window.location.replace(longUrl);
    })
    .catch(function(error) {
      console.log('error', error);
      alert('Page not found');
    });
}

function getLongUrl(slug) {
  const requestUrl = requestBase + slug;
  return fetch(requestUrl).then(function(response) {
    console.log('response', response);
    let message = '';
    if (response.status === 404) {
      message = 'Page not found';
    }
    if (!response.ok) {
      message =
        message ||
        'Something went wrong. Refreshing page may help, otherwise please contact chris@whynot.earth';
      throw new Error(message);
    }

    return response.json();
  });
}
