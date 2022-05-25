let timeouts = [];
const wait = (callback, id, ms) => {
  if (!callback) throw new Error("'callback' not defined");
  if (typeof callback !== 'function') throw new Error("'callback' must be a function");
  if (!id) throw new Error("'id' not defined");
  if (!ms) ms = 100;
  if (timeouts[id]) clearTimeout(timeouts[id]);
  timeouts[id] = setTimeout(callback, ms);
};

module.exports = {
  wait
}