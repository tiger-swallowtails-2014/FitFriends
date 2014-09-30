$(document).ready(function() {
  var geocoder;
  var map;
  var infowindow = new google.maps.InfoWindow();
  var markers = [];
  var challenges = [];


  function initialize() {
    geocoder = new google.maps.Geocoder();
    var haightAshbury = new google.maps.LatLng(37.7699298, -122.4469157);
    var mapOptions = {
      zoom: 14,
      center: haightAshbury,
      mapTypeId: google.maps.MapTypeId.TERRAIN
    };
    map = new google.maps.Map(document.getElementById('map-canvas'),
        mapOptions);

    // This event listener will call addMarker() when the map is clicked.
    google.maps.event.addListener(map, 'click', function(event) {
      position = new google.maps.LatLng(event.latLng.k, event.latLng.B);
      addMarker(position);
      updateFormFields()
    });

    // Adds a marker at the center of the map.
    addMarker(haightAshbury);
    getChallenges()
  }

  // Add a marker to the map and push to the array.
  function addMarker(location) {
    var marker = new google.maps.Marker({
      position: location,
      map: map,
      animation: google.maps.Animation.DROP
    });
    markers.push(marker);
  }

  // Removes the markers from the map, but keeps them in the array.
  function clearMarkers() {
    setAllMap(null);
  }

  // Shows any markers currently in the array.
  function showMarkers() {
    setAllMap(map);
  }

  // ajax call to create a new marker
  var getChallenges = function() {
    $.ajax({
      url: '/all_challenges',
      type: 'GET'
    }).done(function(challengesJSON) {
      setMarkers(challengesJSON)
    })
  }

  // sets coordinates for an array of challenges
  var setMarkers = function(array) {
    for (var i = 0; i < array.length; i++) {
      position = new google.maps.LatLng(array[i].latitude, array[i].longitude);
      addMarker(position)
    }
  }

  // Updates the form fields in the view so they can be submitted with the challenge.
  var updateFormFields = function() {
    latitude = markers[markers.length - 1].position.k
    longitude = markers[markers.length - 1].position.B
    $('.lat').val(latitude)
    $('.long').val(longitude)
    reverseGeocode(latitude, longitude)
  }

  // Geocoding an address
  function codeAddress() {
    var address = document.getElementById('address').value;
    geocoder.geocode( { 'address': address}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        console.log(results)
        map.setCenter(results[0].geometry.location);
        addMarker(results[0].geometry.location)
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
  }

  // Place Geoloacted Pin upon button panel click
  $('.map_button').click(function() {
    codeAddress();
    updateFormFields();
  });

  // Reverse Geocode
  function reverseGeocode(lat, lng) {
    var latlng = new google.maps.LatLng(lat, lng);
      geocoder.geocode({'latLng': latlng}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          if (results[1]) {
            map.setZoom(14);
            marker = new google.maps.Marker({
                position: latlng,
                map: map
            });
            infowindow.setContent(results[1].formatted_address);
            infowindow.open(map, marker);
            $('#challenge_location').val(results[1].formatted_address)
          } else {
            alert('No results found');
          }
        } else {
          alert('Geocoder failed due to: ' + status);
        }
      });
    }


  // if (document.URL == "http://localhost:3000/map") {
    google.maps.event.addDomListener(window, 'load', initialize);
  // }
})




// var MapSizer = function(widthProportion, heightProportion, mapContainer, map) {
//   this.map = map
//   this.mapContainer = mapContainer
//   this.mapWidthProportion = widthProportion
//   this.mapHeightProportion = heightProportion
//   this.initialMapWidth = Math.round(this.mapWidthProportion * mapContainer.width()) + 'px'
//   this.initialMapHeight = Math.round(this.mapHeightProportion * mapContainer.height()) + 'px'
// }


// MapSizer.prototype = {
//   setInitialDimensions: function() {
//     this.map.css("width", this.initialMapWidth)
//     this.map.css("height", this.initialMapHeight)
//   }

//   adjustDimensions: function(){
//     this.map.css("width", this.mapWidthProportion * this.mapContainer.width())
//     this.map.css("height", this.mapHeightProportion * this.mapContainer.height())
//   }
// }

// var mapSizerController = {

// }




var bindMapDimensionsEvent = function() {
  var mapWidthProportion = 1
  var mapHeightProportion = 0.7
  var mapContainer = $('#map-canvas').parent()

  var initialMapWidth = Math.round(mapWidthProportion * mapContainer.width()) + 'px'
  var initialMapHeight = Math.round(mapHeightProportion * mapContainer.height()) + 'px'

  $('#map-canvas').css("width", initialMapWidth)
  $('#map-canvas').css("height", initialMapHeight)

  $(window).resize(function(){
    newMapWidth = mapWidthProportion * mapContainer.width()
    newMapHeight = mapHeightProportion * mapContainer.height()

    cssWidth = Math.round(newMapWidth) + 'px'
    cssHeight = Math.round(newMapHeight) + 'px'
    $('#map-canvas').css("width", cssWidth)
    $('#map-canvas').css("height", cssHeight)
  })
}
