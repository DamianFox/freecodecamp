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
	tempUnitEl = document.getElementById("temp-unit");

	// Add the click event to the temperature unit element
	tempUnitEl.addEventListener("click", changeUnit);

	// Weather forecast API url
	weatherAPI = "https://fcc-weather-api.glitch.me/api/current";

	// Get the description element
	weatherIconEl = document.getElementById("weather-icon");

	// Initialize Geocoder
	geocoder = new google.maps.Geocoder();

	// Get the current location
	getCurrentLocation();
});

// Get current location coordinates 
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

// Callback function in case of geolocation error
function geoError() {
    console.log("Geocoder failed.");
}

// Get the right address from latitude and longitude
// Finally,  print it in the right tag element
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
							temp = data.main.temp;
							tempEl.innerHTML = temp;
							tempUnitEl.innerHTML = " °C";

							iconGen(data.weather[0].main);
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

// Change temparature unit and value 
function changeUnit(){
	var newTempEl = document.getElementById("temp").innerHTML;
	var currentTempUnit = document.getElementById("temp-unit").innerHTML;
	var newTempUnit = currentTempUnit == " °C" ? " °F" : " °C";
	var newTempElValue = currentTempUnit == " °C" ? toFahrenheit(newTempEl) : toCelsius(newTempEl);
	tempEl.innerHTML = newTempElValue;
	tempUnit.innerHTML = newTempUnit;
}

// Celsius to Fahrenheit
function toFahrenheit(celsius){
	return (celsius * 1.8) + 32;
}

// Fahrenheit to Celsius
function toCelsius(fahrenheit){
	return (fahrenheit - 32) / 1.8;
}

function iconGen(desc) {
	var desc = desc.toLowerCase()
	switch (desc) {
		case 'drizzle':
      		weatherIconEl.className += " wi-rain";
      		break;
    	case 'clouds':
    		weatherIconEl.className += " wi-cloudy";
      		break;
    	case 'rain':
      		weatherIconEl.className += " wi-rain";
      		break;
      	case 'snow':
      		weatherIconEl.className += " wi-snow";
      		break;
		case 'clear':
			weatherIconEl.className += " wi-day-sunny";
			break;
		case 'thunderstom':
			weatherIconEl.className += " wi-thunderstorm";
			break;
	    default:
	    	weatherIconEl.className = "wi";
  	}
}

// Get JSON value from url
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