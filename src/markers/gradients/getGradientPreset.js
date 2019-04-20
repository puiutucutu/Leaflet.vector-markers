import { markerGradientPresetNames } from "./markerGradientPresetNames";
import { UnrecognizedMarkerGradientPresetError } from "./UnrecognizedMarkerGradientPresetError";

/**
 * @param {String} name
 * @return {MarkerGradientPreset}
 * @throws {UnrecognizedMarkerGradientPresetError}
 */
const getGradientPreset = name => {
  if (!markerGradientPresetNames.hasOwnProperty(name)) {
    throw new UnrecognizedMarkerGradientPresetError(
      `Requested unrecognized marker gradient preset with name of ${name}`
    );
  }

  const found = markerGradientPresetNames[name];
  const { top, bottom } = found;
  return {
    [name]: {
      ...found,
      top: `rgb(${top.join(",")})`,
      bottom: `rgb(${bottom.join(",")})`
    }
  };
};

/**
 * @param {Array} rgbArr
 * @return {String}
 */
function arrayToRgbString(rgbArr) {
  return `rgb(${rgbArr.join(",")})`;
}

export { getGradientPreset };
