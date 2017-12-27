document.addEventListener("DOMContentLoaded", function(event) {
	// Get the element id location
	locationEl = document.getElementById("location");
	locationEl.innerHTML = "Getting current position...";

	descEl = document.getElementById("desc");

	tempEl = document.getElementById("temp");
	tempUnitEl = document.getElementById("tempUnit");

	weatherEl = document.getElementById("weather");

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
							console.log('Data: ' + data.weather[0].description);
							description = data.weather[0].description;
							descEl.innerHTML = description;

							temp = data.main.temp;
							tempEl.innerHTML = temp;
							tempUnitEl.innerHTML = " °C";
						}
					}
				);
		  		// console.log(lat);
	  			// console.log(lng);
			} else {
			  console.log("No results found");
			}
      } else {
          console.log("Geocoder failed due to: " + status);
      }
    });
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