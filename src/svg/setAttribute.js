/**
 * @param {HTMLElement} el
 * @param {String} name
 * @param {String} value
 * @return {HTMLElement}
 */
function setAttribute(el, name, value) {
  el.setAttribute(name, value);
}

/**
 * @param {HTMLElement} el
 * @return {function(name: String): function(value: String): void}
 */
const setAttributeFor = el => name => value => el.setAttribute(name, value);

export { setAttribute, setAttributeFor };
