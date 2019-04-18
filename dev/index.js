import { VectorMarkers } from "../src";

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
