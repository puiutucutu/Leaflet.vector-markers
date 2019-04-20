import Leaflet from "leaflet";
import { createSvgElement, createSvgPathElement } from "./svg";
import { mapMarker } from "./mapMarker";
import { gradients } from "./markers";

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

  rootClassName: "vector-marker",

  // icon
  iconColor: "white",
  iconClasses: "",
  iconFontSize: 14,
  iconName: "home",

  // customisation of map marker pin options
  doesMarkerHaveShadow: true,
  markerClasses: "",
  markerColor: "blue",

  /**
   * @type {MarkerGradient}
   */
  markerGradient: {
    bottom: "",
    top: ""
  },
  markerGradientPresetName: "",

  // for creating custom pin marker
  markerPinPath: mapMarker.d,
  markerPinViewBox: mapMarker.viewBox
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
   * @param {MarkerGradientPreset} markerGradientPreset
   *
   * @return {boolean}
   */
  isValidMarkerGradient(markerGradientPreset) {
    return !!markerGradientPreset.bottom && !!markerGradientPreset.top;
  }

  /**
   * Delegates which <svg> marker will be used.
   *
   * @return {SVGElement}
   */
  createSvgMarkerPin() {
    /**
     * @param {String} name
     * @param {String[]} presets
     * @return {Boolean}
     */
    function doesSuppliedGradientNameExist(name, presets) {
      return !!name && presets.includes(name);
    }

    // need to check the following
    //
    // (1) did the user pass in one of the preset gradient names to use?
    // (2) did the user pass in a custom gradient to use?
    // (3) otherwise, create a generic marker

    const options = this.options;
    const [width, height] = options.iconSize;
    const {
      markerGradient,
      markerGradientPresetName,
      markerPinPath,
      markerPinViewBox
    } = options;

    const availableGradientPresetNames = gradients.getAvailableGradientPresetNames();

    // (1) did the user pass in one of the preset gradient names to use?
    if (
      !!markerGradientPresetName &&
      doesSuppliedGradientNameExist(
        markerGradientPresetName,
        availableGradientPresetNames
      )
    ) {
      console.log(
        "%c USER PASSED IN ::: PRESET GRADIENT",
        "background: red; color: white; font-weight: bold"
      );

      const presetMarkerGradient = gradients.getGradientPreset(
        markerGradientPresetName
      );

      return this.createSvgMarkerPinWithGradient(
        width,
        height,
        markerPinViewBox,
        markerPinPath,
        presetMarkerGradient.top,
        presetMarkerGradient.bottom
      );
    }

    // (2) did the user pass in a custom gradient to use?
    // (3) otherwise, create a generic marker
    if (this.isValidMarkerGradient(this.options.markerGradient)) {
      console.log(
        "%c USER PASSED IN ::: CUSTOM MARKER GRADIENT",
        "background: red; color: white; font-weight: bold"
      );

      // (2)
      return this.createSvgMarkerPinWithGradient(
        width,
        height,
        markerPinViewBox,
        markerPinPath,
        markerGradient.top,
        markerGradient.bottom
      );
    } else {
      // (3)
      return this.createSvgMarkerPinGeneric();
    }

    // // @todo see about implementing this
    // return this.isValidMarkerGradient(this.options.markerGradient) ||
    //   doesSuppliedGradientNameExist(
    //     markerGradientPresetName,
    //     availableGradientPresetNames
    //   )
    //   ? this.createSvgMarkerPinWithGradient(
    //       // @todo make it so the fn knows to extract data from options alone
    //       width,
    //       height,
    //       markerPinViewBox,
    //       markerPinPath,
    //       markerGradient.gradient.bottom,
    //       markerGradient.gradient.top
    //     )
    //   : this.createSvgMarkerPinGeneric();
  }

  /**
   * Programmatically create marker pin <svg> element.
   *
   * @return {SVGElement}
   */
  createSvgMarkerPinGeneric() {
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
   * Programmatically create a marker pin <svg> element with a gradient.
   *
   * @param {String} width
   * @param {String} height
   * @param {String} viewBox
   * @param {String} pathValue
   * @param {String} gradientTopValue
   * @param {String} gradientBottomValue
   * @return {SVGElement}
   */
  createSvgMarkerPinWithGradient(
    width,
    height,
    viewBox,
    pathValue,
    gradientTopValue,
    gradientBottomValue
  ) {
    const svg = createSvgElement();
    svg.setAttribute("width", width);
    svg.setAttribute("height", height);
    svg.setAttribute("viewBox", viewBox);

    // generate a unique id for each gradient id to avoid gradient id
    // collisions which will prevent gradients from working
    const linearGradientId = String(Math.floor(Math.random() * 1e6));

    const linearGradient = document.createElement("linearGradient");
    linearGradient.setAttribute("id", linearGradientId);
    linearGradient.setAttribute("x1", "0.5");
    linearGradient.setAttribute("x2", "0.5");
    linearGradient.setAttribute("y2", "1");
    linearGradient.setAttribute("gradientUnits", "userSpaceOnUse");

    // the `<linearGradient/>` scale property must match the last two digits
    // of the svg `viewBox` property, otherwise the gradient won't scale
    // properly and will look small
    const [x, y] = viewBox.split(" ").slice(2);
    linearGradient.setAttribute("gradientTransform", `scale(${x} ${y})`);

    const stopBottom = document.createElement("stop");
    stopBottom.setAttribute("offset", "0%");
    stopBottom.setAttribute("stop-color", gradientTopValue);

    const stopTop = document.createElement("stop");
    stopTop.setAttribute("offset", "100%");
    stopTop.setAttribute("stop-color", gradientBottomValue);

    const markerPath = createSvgPathElement(pathValue);
    markerPath.setAttribute("fill", `url(#${linearGradientId})`);

    linearGradient.appendChild(stopBottom);
    linearGradient.appendChild(stopTop);
    svg.appendChild(linearGradient);
    svg.appendChild(markerPath);

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
   * use a css based shadow method instead of a separate image shadow and no
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
