const requestBase = ''.concat(
  process.env.VUE_APP_API_URL,
  '/api/v0/shortener/'
); // e.g. '/t/myslug';

const pathname = window.location.pathname;
const slug = (pathname.split('/') || '')[2];
console.log(pathname, slug);

if (slug) {
  getLongUrl(slug)
    .then(function(response) {
      console.log(response);
      const longUrl = response.url;
      window.location.replace(longUrl);
    })
    .catch(function(error) {
      console.log('error', error);
      alert(
        'Something went wrong, refreshing page may can fix it otherwise please contact with: chris@whynot.earth'
      );
    });
}

function getLongUrl(slug) {
  const requestUrl = requestBase + slug;
  return fetch(requestUrl).then(function(response) {
    return response.json();
  });
}
