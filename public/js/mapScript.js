const UNI_LOCATION = [10.8993923, 76.9029521];

const ICON_SIZE = [50, 50];

var map = L.map("map").setView(UNI_LOCATION, 19);
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);
map.touchZoom.disable();
map.doubleClickZoom.disable();
map.scrollWheelZoom.disable();
map.boxZoom.disable();
map.keyboard.disable();
document.querySelector(".leaflet-control-zoom").style.visibility = "hidden";

export function addTreeMarkerToMap(location, popupText) {
  var treeIcon = L.icon({
    iconUrl: "/assets/game/tree.png",
    shadowUrl: "/assets/game/shadow.png",
    iconSize: ICON_SIZE,
    shadowSize: ICON_SIZE,
    iconAnchor: ICON_SIZE.map((i) => i / 2),
    shadowAnchor: [ICON_SIZE[0] / 2, ICON_SIZE[0] / 2 - 5],
    popupAnchor: [0, -25],
  });

  const marker = L.marker(location, { icon: treeIcon }).addTo(map);
  marker.bindPopup(popupText);
}

// addTreeMarkerToMap(UNI_LOCATION);
// var circle = L.circle([51.508, -0.11], {
//     color: 'red',
//     fillColor: '#f03',
//     fillOpacity: 0.5,
//     radius: 500
// }).addTo(map);
