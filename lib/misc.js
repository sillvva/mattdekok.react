let timeouts = [];
const wait = (callback, id, ms) => {
  if (!callback) throw new Error("'callback' not defined");
  if (typeof callback !== 'function') throw new Error("'callback' must be a function");
  if (!id) throw new Error("'id' not defined");
  if (!ms) ms = 100;
  if (timeouts[id]) clearTimeout(timeouts[id]);
  timeouts[id] = setTimeout(callback, ms);
};

// The debounce function receives our function as a parameter
const debounce = (fn) => {
  // This holds the requestAnimationFrame reference, so we can cancel it if we wish
  let frame;
  // The debounce function returns a new function that can receive a variable number of arguments
  return (...params) => {
    // If the frame variable has been defined, clear it now, and queue for next frame
    if (frame) {
      cancelAnimationFrame(frame);
    }
    // Queue our function call for the next frame
    frame = requestAnimationFrame(() => {
      // Call our function and pass any params we received
      fn(...params);
    });
  }
};

module.exports = {
  wait,
  debounce
}