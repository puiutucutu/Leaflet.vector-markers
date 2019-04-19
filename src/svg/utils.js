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

const SVG_NAMESPACE = "http://www.w3.org/2000/svg";
const XLINK_NAMESPACE = "http://www.w3.org/1999/xlink";

/**
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Namespaces_Crash_Course}
 * @return {SVGElement} */
function createSvg() {
  const svg = document.createElementNS(SVG_NAMESPACE, "svg");
  svg.setAttribute("xmlns", SVG_NAMESPACE);
  svg.setAttribute("xmlns:xlink", XLINK_NAMESPACE);
  svg.setAttributeNS(SVG_NAMESPACE, "version", "1.1");

  return svg;
}

/**
 * @param {SVGElement} svg
 * @param {String} attributeName
 * @param {String} attributeValue
 * @return {SVGElement}
 */
function setSvgAttribute(svg, attributeName, attributeValue) {
  svg.setAttribute(attributeName, attributeValue);
}

/**
 * @param {String} d - {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/d}
 * @param {Object<k,v>} [attributes] - Other valid svg path attributes to add
 * to the path
 * @return {SVGPathElement}
 */
function makeSvgPath(d, attributes = {}) {
  const path = document.createElementNS(SVG_NAMESPACE, "path");
  path.setAttribute("d", d);

  if (Object.keys(attributes).length !== 0) {
    for (let [attrName, attrVal] of Object.entries(attributes)) {
      path.setAttributeNS(SVG_NAMESPACE, attrName, attrVal);
    }
  }

  return path;
}

/**
 * @param {SVGPathElement} svgPath
 * @return {SVGPathElement}
 */
function setFillToCurrentColorOnSvgPath(svgPath) {
  svgPath.setAttributeNS(SVG_NAMESPACE, "fill", "currentColor");
  return svgPath;
}

/**
 * Example
 *
 *   createSvgFromPaths(
 *       "30",
 *       "30",
 *       "0 0 512 512",
 *       ["M499.99 176h-59.87l-16.64-41.6C406.38 91.63 365.57 64 319.5 64h-127c-46.06 0-86.88 27.63-103.99 70.4L71.87 176H12.01C4.2 176-1.53 183.34.37 190.91l6 24C7.7 220.25 12.5 224 18.01 224h20.07C24.65 235.73 16 252.78 16 272v48c0 16.12 6.16 30.67 16 41.93V416c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32v-32h256v32c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32v-54.07c9.84-11.25 16-25.8 16-41.93v-48c0-19.22-8.65-36.27-22.07-48H494c5.51 0 10.31-3.75 11.64-9.09l6-24c1.89-7.57-3.84-14.91-11.65-14.91zm-352.06-17.83c7.29-18.22 24.94-30.17 44.57-30.17h127c19.63 0 37.28 11.95 44.57 30.17L384 208H128l19.93-49.83zM96 319.8c-19.2 0-32-12.76-32-31.9S76.8 256 96 256s48 28.71 48 47.85-28.8 15.95-48 15.95zm320 0c-19.2 0-48 3.19-48-15.95S396.8 256 416 256s32 12.76 32 31.9-12.8 31.9-32 31.9z"]
 *   )
 *
 * @param {String} width
 * @param {String} height
 * @param {String} viewBox
 * @param {String[]} paths @todo implement support for multiple paths
 */
function createSvgFromPaths(width, height, viewBox, paths) {
  const svg = createSvg();
  svg.setAttribute("fill", "currentColor");
  svg.setAttribute("viewBox", viewBox);
  svg.setAttribute("width", height);
  svg.setAttribute("height", width);

  const svgPaths = paths.map(path => makeSvgPath(path));

  for (let svgPath of svgPaths) {
    svg.appendChild(svgPath);
  }

  return svg;
}

export {
  createPath,
  createSvg,
  setSvgAttribute,
  makeSvgPath,
  setFillToCurrentColorOnSvgPath,
  createSvgFromPaths
};

/*

// programmatically create marker pin svg
const svg = createSvg();
setSvgAttribute(svg, "width", width);
setSvgAttribute(svg, "height", height);
setSvgAttribute(svg, "viewBox", options.mapPinViewBox);

const svgMarkerPinPath = makeSvgPath(options.mapPinPath);
svgMarkerPinPath.setAttribute("fill", "red");

// add pin path to svg
svg.appendChild(svgMarkerPinPath);

 */
