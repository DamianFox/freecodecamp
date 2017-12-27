document.addEventListener("DOMContentLoaded", function(event) {

	currentTempUnit = "°C";
	// Get the location element
	locationEl = document.getElementById("location");
	locationEl.innerHTML = "Getting current position...";

	// Get the description element
	descEl = document.getElementById("desc");

	// Get the temperature element
	tempEl = document.getElementById("temp");

	// Get the temperature unit element
	tempUnitEl = document.getElementById("tempUnit");

	tempUnitEl.addEventListener("click", changeUnit);

	weatherAPI = "https://fcc-weather-api.glitch.me/api/current";

	// Initialize Geocoder
	geocoder = new google.maps.Geocoder();

	// Get the current location
	getCurrentLocation();
});

function getCurrentLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(getPosition, geoError);
    } else {
        console.log("Geolocation is not supported by this browser.");
    }
}

function getPosition(position) {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;

    // Get the address from latitude and longitude
    getAddressFromCoords(latitude, longitude);
}

function geoError() {
    console.log("Geocoder failed.");
}

function getAddressFromCoords(lat, lng) {
    var latlng = new google.maps.LatLng(lat, lng);
    geocoder.geocode({'latLng': latlng}, function(results, status) {
      if(status == google.maps.GeocoderStatus.OK) {
			if(results[1]) {
		  		//formatted address
		  		var address = results[1].formatted_address;
		  		locationEl.innerHTML = address;
		  		getJSON(weatherAPI + "?lat="+latitude+"&lon="+longitude,
					function(err, data) {
						if (err !== null) {
							console.log('Something went wrong: ' + err);
						} else {
							// console.log('Data: ' + data.weather[0].description);
							description = data.weather[0].description;
							descEl.innerHTML = description;

							temp = data.main.temp;
							tempEl.innerHTML = temp;
							tempUnitEl.innerHTML = " °C";
						}
					}
				);
			} else {
			  console.log("No results found");
			}
      } else {
          console.log("Geocoder failed due to: " + status);
      }
    });
}

function changeUnit(){
	var newTempEl = document.getElementById("temp").innerHTML;
	var currentTempUnit = document.getElementById("tempUnit").innerHTML;
	var newTempUnit = currentTempUnit == " °C" ? " °F" : " °C";
	var newTempElValue = currentTempUnit == " °C" ? toFahrenheit(newTempEl) : toCelsius(newTempEl);
	tempEl.innerHTML = newTempElValue;
	tempUnit.innerHTML = newTempUnit;
}

function toFahrenheit(celsius){
	return (celsius * 1.8) + 32;
}

function toCelsius(fahrenheit){
	return (fahrenheit - 32) / 1.8;
}

var getJSON = function(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = function() {
      var status = xhr.status;
      if (status === 200) {
        callback(null, xhr.response);
      } else {
        callback(status, xhr.response);
      }
    };
    xhr.send();
};