/**
 * An object containing the start and stop points of a gradient. Both of the
 * properties can take any valid color property for the `stop-color`
 * attribute used in the `<stop>` svg element child of a <linearGradient/>`
 * svg element.
 *
 * Prefer using rgb().
 *
 * @typedef {Object} MarkerGradient
 * @property {String} bottom - This 0% property targets the top of the marker.
 * @property {String} top - This 100% property targets the bottom of the marker.
 */

/**
 * @typedef {Object} MarkerGradientPreset
 * @property {String} name
 * @property {MarkerGradient} gradient
 */

/**
 * @todo change this to a <k,v> dictionary instead where k is name, and v is gradient properties
 * @type {MarkerGradientPreset[]}
 */
const markerGradientPresetNames = [
  {
    name: "blue",
    gradient: {
      top: "rgb(49, 138, 176)",
      bottom: "rgb(67, 180, 240)"
    }
  },
  {
    name: "red",
    gradient: {
      top: "rgb(255, 119, 43)",
      bottom: "rgb(211, 60, 40)"
    }
  }
];

/**
 * @param {MarkerGradientPreset[]} presets
 * @return {String[]}
 */
const getAvailableGradientPresetNames = presets =>
  Object.values(markerGradientPresetNames).reduce(
    (acc, { name }) => [...acc, name],
    []
  );

/**
 * @param {String} name
 * @return MarkerGradientPreset
 */
const getGradientPreset = name => {
  return Object.values(markerGradientPresetNames).filter(
    preset => preset.name === name
  )[0];
};

export {
  markerGradientPresetNames,
  getAvailableGradientPresetNames,
  getGradientPreset
};
