import { VectorMarkers } from "../src";
import "./custom-marker-style.scss";

/* -------------------------------------------------------------------------- */
/* (1) Create your custom markers
/* -------------------------------------------------------------------------- */

const redCoffeeMarker = VectorMarkers.icon({
  iconName: "coffee",
  markerColor: "red"
});

const greenCarMarker = VectorMarkers.icon({
  iconName: "car",
  iconColor: "black",
  markerColor: "#b4fb87"
});

/**
 * Example of a custom sized pin. Note the explicit control over the
 * `iconSize` and `iconFontSize`.
 *
 * Note that you may or may not have to also adjust the popup anchor
 * position depending on the change in size.
 */
const customMarkerWithHomeIcon = VectorMarkers.icon({
  iconSize: [50, 66],
  iconAnchor: [25, 66], // this width is half the width of the `iconSize` width
  popupAnchor: [0, -(66 * 0.786)],

  iconColor: "white", // any valid property for css `color` attribute
  iconFontSize: 24,

  doesMarkerHaveShadow: true,
  markerColor: "rgb(50, 150, 200)", // any valid property for css `color` attribute
  markerClasses: ["custom-marker-style"],
  markerPinPath: "M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0z",
  markerPinViewBox: "0 0 384 512",
  markerGradient: {
    name: "red",
    gradient: {
      zeroPercent: "rgb(255,119,43)",
      oneHundredPercent: "rgb(211,60,40)"
    }
  }
});

/**
 * Example of a creating a custom gradient marker.
 */
const customGradientMarkerWithBoltIcon = VectorMarkers.icon({
  iconName: "bolt",
  markerGradient: {
    name: "red",
    gradient: {
      zeroPercent: "rgb(255,119,43)",
      oneHundredPercent: "rgb(211,60,40)"
    }
  }
});

/* -------------------------------------------------------------------------- */
/* (2) Instantiate Leaflet map and add your custom markers
/* -------------------------------------------------------------------------- */

const mapContainer = document.getElementById("mapContainer");
const coords = [48.15491, 11.54183];
const initialZoom = 18;

const map = L.map(mapContainer).setView(coords, initialZoom);

L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  minZoom: 5
}).addTo(map);

L.marker(coords, { icon: redCoffeeMarker, draggable: true })
  .addTo(map)
  .bindPopup("red coffee marker");

L.marker([48.155, 11.543], { icon: greenCarMarker, draggable: true })
  .addTo(map)
  .bindPopup("green car marker");

L.marker([48.1545, 11.5425], {
  icon: customMarkerWithHomeIcon,
  draggable: true
})
  .addTo(map)
  .bindPopup(
    "this marker uses a custom SVG for the pin and has increased marker pin and icon sizes"
  );

L.marker([48.1548, 11.5429], {
  icon: customGradientMarkerWithBoltIcon,
  draggable: true
})
  .addTo(map)
  .bindPopup("this marker uses a custom gradient");
