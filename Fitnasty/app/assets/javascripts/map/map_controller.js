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

  // This event listener will call MapView.addMarker() when the map is clicked.
  google.maps.event.addListener(map, 'click', function(event) {
    position = new google.maps.LatLng(event.latLng.k, event.latLng.B);
    MapView.addMarker(position);
    MapView.updateFormFields()
  });

  // Place Geoloacted Pin upon button panel click and update form
  $('.map_button').click(function() {
    console.log("clicked")
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
  }

  // Adds a marker at the center of the map.
  MapView.addMarker(haightAshbury);
  getChallenges();
}