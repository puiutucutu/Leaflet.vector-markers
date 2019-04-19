import { VectorMarkers } from "../src";
import "./custom-marker-style.scss";

/* -------------------------------------------------------------------------- */
/* (1) Create your custom markers
/* -------------------------------------------------------------------------- */

const customSvgPinProperties = {
  pin: {
    viewBox: "0 0 384 512",
    path: "M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0z"
  }
};

const redCoffeeMarker = VectorMarkers.icon({
  iconName: "coffee",
  markerColor: "red"
});

const greenCarMarker = VectorMarkers.icon({
  iconName: "car",
  iconColor: "black",
  markerColor: "#B4FB87"
});

/**
 * Example of a custom sized pin. Note the explicit control over the
 * `iconSize` and `iconFontSize`.
 *
 * Note that you may or may not have to also adjust the popup anchor
 * position depending on the change in size.
 */
const customMarkerWithHomeIcon = VectorMarkers.icon({
  iconColor: "white", // any valid property for css `color` attribute
  iconFontSize: 24,
  iconSize: [50, 60],
  popupAnchor: [10, -40],

  doesMarkerHaveShadow: true,
  markerColor: "rgb(50, 150, 200)", // any valid property for css `color` attribute
  markerClasses: ["custom-marker-style"],
  markerPinPath: customSvgPinProperties.pin.path,
  markerPinViewBox: customSvgPinProperties.pin.viewBox
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
