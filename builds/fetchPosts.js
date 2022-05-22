const { fetchPosts } = require('../functions/blog');

(async function() {
  const result = await fetchPosts();
  console.log(result);
  process.exit();
})();
