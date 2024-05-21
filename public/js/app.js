export function $(x) {
  return document.querySelector(x);
}
function requestLocationAccess() {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const { latitude, longitude } = position.coords; // Do something with the coordinates
      console.log(latitude, longitude);
      document.querySelector("#locationPermissionPopup").style.display = "none";
    },
    (error) => {
      document.querySelector("#locationPermissionPopup .error").innerHTML =
        `<b>${error.message}</b>` +
        "<br />" +
        "<ul style='width:fit-content;'><li style='list-style:disc;'>Check your Internet Connection</li><li style='list-style:disc;'>Check your device location capabilities</li></ul>";
      console.error(error); // Handle the error
    }
  );
}
$("#locationAcceptButton").addEventListener("click", requestLocationAccess);

function gameMenuTriggered() {
  console.log("Game Menu Triggered");
  const sideBar = document.querySelector("#sideBar");
  sideBar.classList.toggle("activated");
  if (sideBar.classList.contains("activated")) {
    sideBar.classList.add("translate-x-0");
    sideBar.classList.remove("translate-x-[-300px]");
    $("#gameNavbar").classList.add("translate-x-[300px]");
    $("#mapWrapper").classList.add("translate-x-[300px]");
    mapOverlay.classList.remove("hidden");
  } else {
    sideBar.classList.remove("translate-x-0");
    sideBar.classList.add("translate-x-[-300px]");
    $("#gameNavbar").classList.remove("translate-x-[300px]");
    $("#mapWrapper").classList.remove("translate-x-[300px]");
    mapOverlay.classList.add("hidden");
  }
}
const gameMenuButton = $("#gameMenuButton");
const mapOverlay = $("#mapOverlay");
gameMenuButton.addEventListener("click", gameMenuTriggered);
mapOverlay.addEventListener("click", gameMenuTriggered);
