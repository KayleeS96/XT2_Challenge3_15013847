// code for weather

function getAPIdata() {

	var url = 'https://api.openweathermap.org/data/2.5/weather';
	var apiKey ='0c6b4ce3001f1d457d7f6d2cea9fc260';
	var city = 'the%20Hague,nl';

	// construct request
	var request = url + '?' + 'appid=' + apiKey + '&' + 'q=' + city;
	
	// get current weather
	fetch(request)
	
	// parse to JSON format
	.then(function(response) {
		if(!response.ok) throw Error(response.statusText);
		return response.json();
	})
	
	// render weather per day
	.then(function(response) {
		// render weatherCondition
		onAPISucces(response);	
	})
	
	// catch error
	.catch(function (error) {
		onAPIError(error);
	});
}


function onAPISucces(response) {
	// get type of weather in string format
	var type = response.weather[0].description;

  // the weather icon should be called and changed according to the current weather condition, this doesn't work :-(
	var iconCode = response.weather[0].icon; // attempt to display the weather icon
  var iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png"; // attempt to display the weather icon
 
	// get temperature in Celcius
	var degC = Math.floor(response.main.temp - 273.15);

	// render weather in DOM
	var weatherBox = document.getElementById('weather');
	weatherBox.innerHTML = degC + '&#176;C <br>' + type;
  $(".icon").html("<img src='" + iconUrl  + "'>"); // attempt to display the weather icon
    
}

function onAPIError(error) {
	console.error('Request failed', error);
	var weatherBox = document.getElementById('weather');
	weatherBox.className = 'hidden'; 
}

// init data stream
getAPIdata();




// code for map
mapboxgl.accessToken = 'pk.eyJ1Ijoia3M5NjE5IiwiYSI6ImNrbjV2ajJxMDA3emIybm54c3I1cGlqdngifQ.bYaWGr35Jq7JBbYiTIb9ow';

// Initialate map
var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/ks9619/cl1g8lgxd000a14ocbjhl4zy4',
  center: [4.3143726, 52.0782332],
  zoom: 15
});

map.on('click', (event) => {
  // If marker is clicked info will appear.
  const features = map.queryRenderedFeatures(event.point, {
    layers: ['the-hague-city-center-restaurant']
  });
  if (!features.length) {
    return;
  }
  const feature = features[0];

const popup = new mapboxgl.Popup({ offset: [0, -15] })
  .setLngLat(feature.geometry.coordinates)
  .setHTML(
    `<h3>${feature.properties.title}</h3><p>${feature.properties.description}</p>`
  )

  .addTo(map);
  
  }),

map.addControl(new mapboxgl.NavigationControl());
