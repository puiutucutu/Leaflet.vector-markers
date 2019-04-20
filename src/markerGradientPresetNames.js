/**
 * An object containing the start and stop points of a gradient. Both of the
 * properties can take any valid color property for the `stop-color`
 * attribute used in the `<stop>` svg element child of a <linearGradient/>`
 * svg element.
 *
 * Prefer using rgb().
 *
 * @typedef {Object} MarkerGradient
 * @property {String} zeroPercent - This 0% property targets the top of the marker.
 * @property {String} oneHundredPercent - This 100% property targets the bottom of the marker.
 */

/**
 * @typedef {Object} MarkerGradientPreset
 * @property {String} name
 * @property {MarkerGradient} gradient
 */

/**
 * @type {MarkerGradientPreset[]}
 */
const markerGradientPresetNames = [
  {
    name: "blue",
    gradient: {
      zeroPercent: "rgb(67, 180, 240)",
      oneHundredPercent: "rgb(49, 138, 176)"
    }
  },
  {
    name: "red",
    gradient: {
      zeroPercent: "rgb(255, 119, 43)",
      oneHundredPercent: "rgb(211, 60, 40)"
    }
  }
];

export { markerGradientPresetNames };
