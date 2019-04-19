import Leaflet from "leaflet";
import * as mapPins from "./mapPins";

// example importing svg icon as string
const svgIconString = require("../svgicons/map-marker-solid.svg")
console.log(svgIconString)

const iconOptions = {
  // options available in L.Marker
  iconSize: [30, 50],
  iconAnchor: [15, 50],
  popupAnchor: [2, -40],
  shadowAnchor: [39, 45],
  shadowSize: [54, 51],

  // @todo sort
  className: "vector-marker",
  prefix: "fa",
  spinClass: "fa-spin",
  extraIconClasses: "",
  extraDivClasses: "",
  icon: "home",
  iconColor: "white",

  // customisation of map pin options
  markerColor: "blue",
  mapPin: mapPins.original.d,
  viewBox: mapPins.original.viewBox
};

class Icon extends Leaflet.Icon {
  constructor(options) {
    super(options);
    Leaflet.Util.setOptions(this, iconOptions);
    Leaflet.Util.setOptions(this, options);
  }

  createIcon(oldIcon) {
    const div =
      oldIcon && oldIcon.tagName === "DIV"
        ? oldIcon
        : document.createElement("div");
    const options = this.options;
    const pinPath = options.mapPin;

    const [width, height] = options.iconSize;

    // prettier-ignore
    div.innerHTML = `<svg width="${width}" height="${height}" viewBox="${options.viewBox}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="${pinPath}" fill="${options.markerColor}"></path></svg>`

    if (options.icon) {
      div.appendChild(this.createInner());
    }

    options.className +=
      options.className.length > 0
        ? " " + options.extraDivClasses
        : options.extraDivClasses;

    this.setIconStyles(div, "icon");
    this.setIconStyles(div, `icon-${options.markerColor}`);
    return div;
  }

  createShadow() {
    const div = document.createElement("div");
    this.setIconStyles(div, "shadow");
    return div;
  }

  /**
   * @private
   */
  createInner() {
    const i = document.createElement("i");
    const options = this.options;

    // leaflet will error if an empty prefix is supplied, as in `""`
    if (!!options.prefix) {
      i.classList.add(options.prefix);
    }

    if (options.extraClasses) {
      i.classList.add(options.extraClasses);
    }
    if (options.prefix) {
      i.classList.add(options.prefix + "-" + options.icon);
    } else {
      i.classList.add(options.icon);
    }
    if (options.spin && typeof options.spinClass === "string") {
      i.classList.add(options.spinClass);
    }
    if (options.iconColor) {
      if (options.iconColor === "white" || options.iconColor === "black") {
        i.classList.add("icon-" + options.iconColor);
      } else {
        i.style.color = options.iconColor;
      }
    }
    if (options.iconSize) {
      i.style.width = options.iconSize[0] + "px";
    }
    return i;
  }

  /**
   * @private
   * @param {HTMLElement} img
   * @param {String} name
   */
  setIconStyles(img, name) {
    const options = this.options;
    const size = Leaflet.point(
      options[name === "shadow" ? "shadowSize" : "iconSize"]
    );
    let anchor = void 0;

    if (name === "shadow") {
      anchor = Leaflet.point(options.shadowAnchor || options.iconAnchor);
    } else {
      anchor = Leaflet.point(options.iconAnchor);
    }
    if (!anchor && size) {
      anchor = size.divideBy(2, true);
    }
    img.className = "vector-marker-" + name + " " + options.className;
    if (anchor) {
      img.style.marginLeft = -anchor.x + "px";
      img.style.marginTop = -anchor.y + "px";
    }
    if (size) {
      img.style.width = size.x + "px";
      img.style.height = size.y + "px";
    }
  }
}

export { Icon };
