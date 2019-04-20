import { markerGradientPresetNames } from "./markerGradientPresetNames";

/**
 * @param {MarkerGradientPreset[]} presets
 * @return {String[]}
 */
const getAvailableGradientPresetNames = () =>
  Object.keys(markerGradientPresetNames);

export { getAvailableGradientPresetNames };
