import { VectorMarkers } from "../src";

const svgIconString = require("../svgicons/broadcast-tower-solid.svg")
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
    path: "M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0z",
    viewBox: "0 0 384 512"
  },
  car: {
    path: "M499.99 176h-59.87l-16.64-41.6C406.38 91.63 365.57 64 319.5 64h-127c-46.06 0-86.88 27.63-103.99 70.4L71.87 176H12.01C4.2 176-1.53 183.34.37 190.91l6 24C7.7 220.25 12.5 224 18.01 224h20.07C24.65 235.73 16 252.78 16 272v48c0 16.12 6.16 30.67 16 41.93V416c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32v-32h256v32c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32v-54.07c9.84-11.25 16-25.8 16-41.93v-48c0-19.22-8.65-36.27-22.07-48H494c5.51 0 10.31-3.75 11.64-9.09l6-24c1.89-7.57-3.84-14.91-11.65-14.91zm-352.06-17.83c7.29-18.22 24.94-30.17 44.57-30.17h127c19.63 0 37.28 11.95 44.57 30.17L384 208H128l19.93-49.83zM96 319.8c-19.2 0-32-12.76-32-31.9S76.8 256 96 256s48 28.71 48 47.85-28.8 15.95-48 15.95zm320 0c-19.2 0-48 3.19-48-15.95S396.8 256 416 256s32 12.76 32 31.9-12.8 31.9-32 31.9z",
    viewBox: "0 0 512 512"
  },
  broadCastTower: {
    path: "M150.94 192h33.73c11.01 0 18.61-10.83 14.86-21.18-4.93-13.58-7.55-27.98-7.55-42.82s2.62-29.24 7.55-42.82C203.29 74.83 195.68 64 184.67 64h-33.73c-7.01 0-13.46 4.49-15.41 11.23C130.64 92.21 128 109.88 128 128c0 18.12 2.64 35.79 7.54 52.76 1.94 6.74 8.39 11.24 15.4 11.24zM89.92 23.34C95.56 12.72 87.97 0 75.96 0H40.63c-6.27 0-12.14 3.59-14.74 9.31C9.4 45.54 0 85.65 0 128c0 24.75 3.12 68.33 26.69 118.86 2.62 5.63 8.42 9.14 14.61 9.14h34.84c12.02 0 19.61-12.74 13.95-23.37-49.78-93.32-16.71-178.15-.17-209.29zM614.06 9.29C611.46 3.58 605.6 0 599.33 0h-35.42c-11.98 0-19.66 12.66-14.02 23.25 18.27 34.29 48.42 119.42.28 209.23-5.72 10.68 1.8 23.52 13.91 23.52h35.23c6.27 0 12.13-3.58 14.73-9.29C630.57 210.48 640 170.36 640 128s-9.42-82.48-25.94-118.71zM489.06 64h-33.73c-11.01 0-18.61 10.83-14.86 21.18 4.93 13.58 7.55 27.98 7.55 42.82s-2.62 29.24-7.55 42.82c-3.76 10.35 3.85 21.18 14.86 21.18h33.73c7.02 0 13.46-4.49 15.41-11.24 4.9-16.97 7.53-34.64 7.53-52.76 0-18.12-2.64-35.79-7.54-52.76-1.94-6.75-8.39-11.24-15.4-11.24zm-116.3 100.12c7.05-10.29 11.2-22.71 11.2-36.12 0-35.35-28.63-64-63.96-64-35.32 0-63.96 28.65-63.96 64 0 13.41 4.15 25.83 11.2 36.12l-130.5 313.41c-3.4 8.15.46 17.52 8.61 20.92l29.51 12.31c8.15 3.4 17.52-.46 20.91-8.61L244.96 384h150.07l49.2 118.15c3.4 8.16 12.76 12.01 20.91 8.61l29.51-12.31c8.15-3.4 12-12.77 8.61-20.92l-130.5-313.41zM271.62 320L320 203.81 368.38 320h-96.76z",
    viewBox: "0 0 640 512"
  }
};

// make your own custom pin
const CustomSvgMarkerPin = VectorMarkers.icon({
  mapPin: svgMarkers.broadCastTower.path,
  viewBox: svgMarkers.broadCastTower.viewBox,
  icon: "",
  // iconSize: [37.5, 50],
  markerColor: "rgb(255,0,0)",
  iconSize: [40,60],
  extraDivClasses: "box-container"
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

//
// programatically create an SVG path with shape
//
const path = document.createElementNS('http://www.w3.org/2000/svg', "path");
path.setAttributeNS("http://www.w3.org/2000/svg", "d", "M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0z")
