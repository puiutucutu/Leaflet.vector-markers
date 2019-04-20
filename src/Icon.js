import Leaflet from "leaflet";
import { createSvgElement, createSvgPathElement } from "./svg";
import { mapMarker } from "./mapMarker";

const iconOptions = {
  /**
   * native properties available in `L.Icon.Default`
   */

  // note that this `iconSize` property is set to match the SVG markers'
  // dimensions of 32px width, 52px height, and a viewBox of `0 0 32 52`
  iconSize: [32, 52],
  iconAnchor: [15, 50],
  popupAnchor: [2, -40],

  /**
   * non-native properties
   */

  // icon
  iconColor: "white",
  iconClasses: "",
  iconFontSize: 14,
  iconName: "home",

  // customisation of map marker pin options
  doesMarkerHaveShadow: true,
  markerClasses: "",
  markerColor: "blue",
  markerPinPath: mapMarker.d,
  markerPinViewBox: mapMarker.viewBox,
  rootClassName: "vector-marker"
};

/**
 * Overwrites leaflet's own L.DivIcon class implementation.
 *
 * We are using the `L.DivIcon` as the base class because it is Leaflet's
 * native feature-light implementation of the `L.Icon`.
 *
 * @external L.Icon
 * @see {@link https://github.com/Leaflet/Leaflet/blob/master/src/layer/marker/Icon.js}
 * @see {@link https://github.com/Leaflet/Leaflet/blob/master/src/layer/marker/Icon.Default.js}
 */
class Icon extends Leaflet.DivIcon {
  constructor(options) {
    super(options);
    Leaflet.Util.setOptions(this, iconOptions);
    Leaflet.Util.setOptions(this, options);
  }

  /**
   * @param {HTMLElement} [oldIcon]
   * @return {HTMLElement}
   */
  createIcon(oldIcon) {
    const options = this.options;
    const { rootClassName } = this.options;

    const div =
      oldIcon && oldIcon.tagName === "DIV"
        ? oldIcon
        : document.createElement("div");

    /**
     * handle marker pin generation
     */

    const svg = this.createSvgMarkerPin();
    div.innerHTML = svg.outerHTML; // inject html into div, forcing a render
    div.classList.add(rootClassName);

    if (!!options.markerClasses) {
      div.classList.add(...options.markerClasses);
    }

    if (options.doesMarkerHaveShadow) {
      div.classList.add("marker-shadow");
    }

    /**
     * handle icon generation
     */

    div.appendChild(this.createIconElement());

    this._setIconStyles(div, "icon");

    return div;
  }

  /**
   * Programmatically create marker pin <svg> element.
   *
   * @return {SVGElement}
   */
  createSvgMarkerPin() {
    const options = this.options;
    const [width, height] = options.iconSize;

    const svg = createSvgElement();
    svg.setAttribute("width", width);
    svg.setAttribute("height", height);
    svg.setAttribute("viewBox", options.markerPinViewBox);

    const markerPath = createSvgPathElement(options.markerPinPath);
    markerPath.setAttribute("fill", options.markerColor);

    svg.appendChild(markerPath); // add pin path to svg

    return svg;
  }

  /**
   * @private
   * @return {HTMLElement}
   */
  createIconElement() {
    const { iconName, iconClasses, iconColor, iconFontSize } = this.options;

    const i = document.createElement("i");
    i.classList.add("fa", `fa-${iconName}`);
    i.style.fontSize = `${iconFontSize}px`;
    i.style.width = `100%`;
    i.style.height = `100%`;

    if (!!iconClasses) {
      i.classList.add(iconClasses);
    }

    if (!!iconColor) {
      i.style.color = iconColor;
    }

    return i;
  }

  /**
   * @override
   * @private
   * @param {HTMLElement} element
   * @param {String} name
   */
  _setIconStyles(element, name) {
    const options = this.options;
    const size = Leaflet.point(options.iconSize);
    const anchor = Leaflet.point(options.iconAnchor);

    // unchanged from original leaflet source
    if (anchor) {
      element.style.marginLeft = -anchor.x + "px";
      element.style.marginTop = -anchor.y + "px";
    }

    if (size) {
      element.style.width = size.x + "px";
      element.style.height = size.y + "px";
    }
  }
}

export { Icon };
