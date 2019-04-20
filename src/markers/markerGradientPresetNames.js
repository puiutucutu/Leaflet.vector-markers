/**
 * An object containing the start and stop points of a gradient. Both of the
 * properties can take any valid color property for the `stop-color`
 * attribute used in the `<stop>` svg element child of a <linearGradient/>`
 * svg element.
 *
 * Prefer using rgb().
 *
 * @typedef {Object} MarkerGradient
 * @property {String} top - Refers to the `stop-color` attribute set to `0%`
 * @property {String} bottom - Refers to the `stop-color` attribute set to `100%`
 */

/**
 * @typedef {Object} MarkerGradientPreset
 * @property {String} key
 * @property {MarkerGradient} value
 */

/**
 * @type {MarkerGradientPreset}
 */
const markerGradientPresetNames = {
  blue: {
    top: "rgb(49, 138, 176)",
    bottom: "rgb(67, 180, 240)"
  },
  red: {
    top: "rgb(255, 119, 43)",
    bottom: "rgb(211, 60, 40)"
  }
};

export { markerGradientPresetNames };
