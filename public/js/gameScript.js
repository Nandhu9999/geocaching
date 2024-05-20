import { TREES_LIST } from "./config.js";
import { addTreeMarkerToMap, getUserLocation } from "./mapScript.js";

TREES_LIST.forEach((treeItem, idx) => {
  const randomlySelected = Math.floor(Math.random() * 10) === 0;
  if (randomlySelected) {
    const location = treeItem.coords.split(",");
    addTreeMarkerToMap(idx, location, "", TREE_CLICKED);
  }
});

function TREE_CLICKED(idx) {
  console.log("Clicked", idx);
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

getUserCurrentLocation();
