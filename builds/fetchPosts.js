const { fetchPosts } = require('../functions/blog');

(async function() {
  await fetchPosts();
})();
