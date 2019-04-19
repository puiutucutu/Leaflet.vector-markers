import { SVG_NAMESPACE } from "./constants";

/**
 * @param {SVGPathElement} svgPath
 * @return {SVGPathElement}
 */
function setFillToCurrentColorOnPath(svgPath) {
  svgPath.setAttributeNS(SVG_NAMESPACE, "fill", "currentColor");
}

export { setFillToCurrentColorOnPath };
