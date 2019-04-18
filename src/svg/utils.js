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

// const path = "M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0z"
// console.log(createPath(path ))
// console.log(createPath(path, false))

export { createPath };
