import { markerGradientPresetNames } from "./markerGradientPresetNames";
import { UnrecognizedMarkerGradientPresetError } from "./UnrecognizedMarkerGradientPresetError";

/**
 * @param {Array} rgbArr
 * @return {String}
 */
const arrayToRgbString = rgbArr => `rgb(${rgbArr.join(",")})`;

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
      top: arrayToRgbString(top),
      bottom: arrayToRgbString(bottom)
    }
  };
};

export { getGradientPreset };
