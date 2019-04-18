import { VectorMarkers } from "../src";

const mapContainer = document.getElementById("mapContainer");
const coords = [48.15491, 11.54183];
const initialZoom = 18;

const map = L.map(mapContainer).setView(coords, initialZoom);

// add tile layer to map
L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  minZoom: 5
}).addTo(map);

// creates a red marker with the coffee icon
const RedMarker = VectorMarkers.icon({
  icon: "coffee",
  markerColor: "red"
});

L.marker(coords, { icon: RedMarker, draggable: true })
  .addTo(map)
  .bindPopup("sample popup");
