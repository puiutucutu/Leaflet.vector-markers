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
  iconAnchor: [16, 52], // this width is half the width of the `iconSize` width
  popupAnchor: [0, -(52 * 0.786)], // offset the popup by a fib ratio to slightly cover the top of the marker

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
   * @override
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
     * prepare marker pin
     */

    const svg = this.createSvgMarkerPin();

    // inject html into div, forcing a render - otherwise, Leaflet does not
    // seem to work render the <svg> properly when using `div.appendChild(svg)`
    div.innerHTML = svg.outerHTML;

    // start adding css classes to container
    div.classList.add(rootClassName);

    if (!!options.markerClasses) {
      div.classList.add(...options.markerClasses);
    }

    if (options.doesMarkerHaveShadow) {
      div.classList.add("vector-marker-shadow");
    }

    /**
     * prepare icon
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

    svg.appendChild(markerPath); // add path shape to svg

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
   * The core of this method has been stripped down since we have opted to
   * use a css based shadow method over a separate image shadow and no
   * longer need the functionality of the overridden method.
   *
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
      const { x, y } = anchor;
      element.style.marginLeft = `-${x}px`;
      element.style.marginTop = `-${y}px`;
    }

    if (size) {
      const { x, y } = size;
      element.style.width = `${x}px`;
      element.style.height = `${y}px`;
    }
  }
}

export { Icon };
