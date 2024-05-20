import { TREES_LIST } from "./config.js";
import {
  addTreeMarkerToMap,
  getUserLocation,
  updateMapView,
  updateUserLocation,
} from "./mapScript.js";

TREES_LIST.forEach((treeItem, idx) => {
  const randomlySelected = Math.floor(Math.random() * 5) === 0;
  if (randomlySelected) {
    const location = treeItem.coords.split(",");
    addTreeMarkerToMap(idx, location, "", TREE_CLICKED);
  }
});

function TREE_CLICKED(idx) {
  console.log("Clicked", idx);
  const questionPopup = document.querySelector("#questionPopup");
  questionPopup.classList.remove("hidden");
  questionPopup.querySelector("#question").innerText = `What is life?`;
  const optionsHolder = questionPopup.querySelector("#options");
  const templateButton = optionsHolder.querySelector("#buttonTemplate");
  optionsHolder.innerHTML = null;
  const optionsList = [
    "abc abc abc abc",
    "bcd bcd bcd bcd bcd bcd bcd",
    "cde cde cde cde cde cde cde cde cde",
    "def def def def def def def def def",
  ];
  optionsList.forEach((optionText) => {
    const optionButton = templateButton.cloneNode(true);
    optionButton.innerText = optionText;
    optionButton.classList.remove("hidden");
    optionsHolder.appendChild(optionButton);
  });
  optionsHolder.appendChild(templateButton);
}

async function getUserCurrentLocation() {
  const location = await getUserLocation();
  console.log(location);
  if (location.status == "success") {
    const locationPermissionPopup = document.querySelector(
      "#locationPermissionPopup"
    );
    locationPermissionPopup.querySelector("button").innerText = "Accepted";
    setTimeout(() => {
      locationPermissionPopup.classList.add("hidden");
    }, 200);
  } else {
    locationPermissionPopup.classList.remove("hidden");
  }
}

const UserLocations = {
  last: {},
  list: [],
  add: function (obj) {
    this.list.push(obj);
    this.last = obj;
    if (this.list.length > 3) {
      this.list.splice(0, 1);
    }
  },
};

async function gameLoop() {
  const userLocation = await getUserLocation();
  if (userLocation.status == "success") {
    UserLocations.add({
      valid: true,
      lat: userLocation.lat,
      lng: userLocation.lng,
    });
  } else {
    UserLocations.add({
      valid: false,
      lat: 0,
      lng: 0,
    });
  }
  if (UserLocations.last.valid) {
    updateUserLocation([UserLocations.last.lat, UserLocations.last.lng], 5);
    // updateMapView([UserLocations.last.lat, UserLocations.last.lng]);
  }
}

function closeQuesitonPopup() {
  questionPopup.classList.add("hidden");
}

function Main() {
  getUserCurrentLocation();
  setInterval(gameLoop, 1000);

  const questionPopup = document.querySelector("#questionPopup");
  questionPopup
    .querySelector(".quitButton")
    .addEventListener("click", closeQuesitonPopup);
}
Main();
