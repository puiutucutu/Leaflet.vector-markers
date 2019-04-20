/**
 * An object containing the start and stop points of a gradient. Both of the
 * properties can take any valid color property for the `stop-color`
 * attribute used in the `<stop>` svg element child of a <linearGradient/>`
 * svg element.
 *
 * Prefer using rgb().
 *
 * @typedef {Object} MarkerGradient
 * @property {String} top - This 100% property targets the bottom of the marker.
 * @property {String} bottom - This 0% property targets the top of the marker.
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

/**
 * @param {MarkerGradientPreset[]} presets
 * @return {String[]}
 */
const getAvailableGradientPresetNames = presets => Object.keys(presets);

/**
 * @param {String} name
 * @return {(MarkerGradientPreset | undefined |)}
 */
const getGradientPreset = name => {
  if (markerGradientPresetNames.hasOwnProperty(name)) {
    return markerGradientPresetNames[name];
  }

  return void 0;
};

export {
  markerGradientPresetNames,
  getAvailableGradientPresetNames,
  getGradientPreset
};
