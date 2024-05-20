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
