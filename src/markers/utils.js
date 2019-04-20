import { markerGradientPresetNames } from "./markerGradientPresetNames";

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

export { getAvailableGradientPresetNames, getGradientPreset };
