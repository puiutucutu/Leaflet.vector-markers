import { VectorMarkers } from "../src";

const svgIconString = require("../svgicons/coffee-solid.svg")
console.log(svgIconString)

const mapContainer = document.getElementById("mapContainer");
const coords = [48.15491, 11.54183];
const initialZoom = 18;

const map = L.map(mapContainer).setView(coords, initialZoom);

// add tile layer to map
L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  minZoom: 5
}).addTo(map);

const RedCoffeeMarker = VectorMarkers.icon({
  icon: "coffee",
  markerColor: "red"
});

const GreenCarMarker = VectorMarkers.icon({
  icon: "car",
  markerColor: "green"
});

L.marker(coords, { icon: RedCoffeeMarker, draggable: true })
  .addTo(map)
  .bindPopup("sample popup");

L.marker([48.155, 11.543], { icon: GreenCarMarker, draggable: true })
  .addTo(map)
  .bindPopup("sample popup");

// @todo finish testing out
const svgMarkers = {
  pin: {
    path:
      "M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0z",
    viewBox: "0 0 384 512"
  },
  car: {
    path:
      "M499.99 176h-59.87l-16.64-41.6C406.38 91.63 365.57 64 319.5 64h-127c-46.06 0-86.88 27.63-103.99 70.4L71.87 176H12.01C4.2 176-1.53 183.34.37 190.91l6 24C7.7 220.25 12.5 224 18.01 224h20.07C24.65 235.73 16 252.78 16 272v48c0 16.12 6.16 30.67 16 41.93V416c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32v-32h256v32c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32v-54.07c9.84-11.25 16-25.8 16-41.93v-48c0-19.22-8.65-36.27-22.07-48H494c5.51 0 10.31-3.75 11.64-9.09l6-24c1.89-7.57-3.84-14.91-11.65-14.91zm-352.06-17.83c7.29-18.22 24.94-30.17 44.57-30.17h127c19.63 0 37.28 11.95 44.57 30.17L384 208H128l19.93-49.83zM96 319.8c-19.2 0-32-12.76-32-31.9S76.8 256 96 256s48 28.71 48 47.85-28.8 15.95-48 15.95zm320 0c-19.2 0-48 3.19-48-15.95S396.8 256 416 256s32 12.76 32 31.9-12.8 31.9-32 31.9z",
    viewBox: "0 0 512 512"
  }
};

// make your own custom pin
const CustomSvgMarkerPin = VectorMarkers.icon({
  mapPin: svgMarkers.pin.path,
  viewBox: svgMarkers.pin.viewBox,
  // iconSize: [37.5, 50],
  markerColor: "rgb(13, 186, 197)"
  // markerColor: "blue",
  // iconSize: [40,60],
});

L.marker([48.155, 11.543], { icon: CustomSvgMarkerPin, draggable: true }).addTo(
  map
);

const DivIcon = L.divIcon({ iconSize: [100,100], className: "my-div-icon" });
L.marker([48.15491, 11.54183], { icon: DivIcon, draggable: true }).addTo(map);

console.log(DivIcon);

/**
 * @param {String} svg - String representation of an svg
 * @return {String} - Base64 encoding of an svg
 */
const svgToBase64 = svg => `data:image/svg+xml;base64,${btoa(svg)}`;

const iconUrlBase64 = svgToBase64(svgIconString)
const icon2 = L.icon({
  iconUrl: iconUrlBase64,
  iconSize: [35, 45],
  iconAnchor: [17, 42],
  popupAnchor: [0, -40]
});

L.marker([48.155, 11.543], { icon: icon2, draggable: true })
.addTo(map)
.bindPopup("sample popup");
