import { markerGradientPresetNames } from "./markerGradientPresetNames";

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

export { getGradientPreset };
