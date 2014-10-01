function initialize() {
  geocoder = new google.maps.Geocoder();

  var mapOptions = {
    zoom: 13
  };

  map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);

  // This event listener will call MapView.addMarker() when the map is clicked.
  google.maps.event.addListener(map, 'click', function(event) {
    position = new google.maps.LatLng(event.latLng.k, event.latLng.B);
    if (MapModel.beenClicked) {
      MapView.deleteLastMarker()
    }
    MapView.addMarker(position);
    MapView.updateFormFields();
    MapModel.beenClicked = true
  });

  // Place Geoloacted Pin upon button panel click and update form
  $('.map_button').click(function() {
    MapModel.codeAddress();
    MapView.updateFormFields();
  });

  // ajax call to create a new marker
   var getChallenges = function() {
     $.ajax({
       url: '/all_challenges',
       type: 'GET'
     }).done(function(challengesJSON) {
       MapView.setMarkers(challengesJSON)
     })
   };

   getChallenges();

  // Geolocation if the browser allows it
  if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var pos = new google.maps.LatLng(position.coords.latitude,
                                         position.coords.longitude);

        map.setCenter(pos);
      }, function() {
        handleNoGeolocation(true);
      });
    } else {
      // Browser doesn't support Geolocation
      handleNoGeolocation(false);
    }
  };

  // What to do if the browser doesn't handle GeoLocation.
  function handleNoGeolocation(errorFlag) {
    if (errorFlag) {
      var content = 'Error: The Geolocation service failed.';
    } else {
      var content = 'Error: Your browser doesn\'t support geolocation.';
    }

    var options = {
      map: map,
      position: new google.maps.LatLng(37.7699298, -122.4469157),
      content: content
    };

    map.setCenter(options.position);
}




// function initialize() {
//   geocoder = new google.maps.Geocoder();
//   var haightAshbury = new google.maps.LatLng(37.7699298, -122.4469157);
//   var mapOptions = {
//     zoom: 13,
//     center: haightAshbury,
//     mapTypeId: google.maps.MapTypeId.TERRAIN
//   };
//   map = new google.maps.Map(document.getElementById('map-canvas'),
//       mapOptions);

//   // This event listener will call MapView.addMarker() when the map is clicked.
//   google.maps.event.addListener(map, 'click', function(event) {
//     position = new google.maps.LatLng(event.latLng.k, event.latLng.B);
//     if (MapModel.beenClicked) {
//       MapView.deleteLastMarker()
//     }
//     MapView.addMarker(position);
//     MapView.updateFormFields();
//     MapModel.beenClicked = true
//   });

//   // Place Geoloacted Pin upon button panel click and update form
//   $('.map_button').click(function() {
//     MapModel.codeAddress();
//     MapView.updateFormFields();
//   });

//   // Adds a marker at the center of the map.
//   MapView.addMarker(haightAshbury);
//   getChallenges();
// }

//  // ajax call to create a new marker
//   var getChallenges = function() {
//     $.ajax({
//       url: '/all_challenges',
//       type: 'GET'
//     }).done(function(challengesJSON) {
//       MapView.setMarkers(challengesJSON)
//     })
//   }