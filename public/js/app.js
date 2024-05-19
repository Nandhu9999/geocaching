function requestLocationAccess() {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const { latitude, longitude } = position.coords; // Do something with the coordinates
      console.log(latitude, longitude);
      document.querySelector("#locationPermissionPopup").style.display = "none";
    },
    (error) => {
      console.error(error); // Handle the error
    }
  );
}
