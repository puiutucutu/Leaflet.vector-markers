/**
 * @param {String} line
 * @param {Boolean} fillCurrentColour
 * @return {String}
 */
function createPath(line, fillCurrentColour = true) {
  /**
   * version 1
   */

  // return `<path ${
  //   !!fillCurrentColour ? 'fill="currentColor"' : ""
  // } d="${line}"></path>`;

  /**
   * version 2
   */

  const svgPathProperties = {
    fill: !!fillCurrentColour ? `fill="currentColor"` : null,
    d: `d="${line}"`
  };

  const pathPropertiesStringified = Object.keys(svgPathProperties).reduce(
    (acc, keyName) => {
      const pathPropertyValue = svgPathProperties[keyName];
      return !!pathPropertyValue ? `${acc} ${pathPropertyValue}` : acc;
    },
    ""
  );

  const final = `<path${pathPropertiesStringified}></path>`;

  return final;
}

export { createPath };
