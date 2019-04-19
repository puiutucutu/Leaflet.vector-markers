import { SVG_NAMESPACE } from "./constants";

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

export { makeSvgPath };
