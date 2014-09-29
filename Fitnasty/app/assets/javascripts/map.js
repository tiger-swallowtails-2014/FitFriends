$(document).ready(function() {
  var map;
  var markers = [];
  var challenges = [];


  function initialize() {
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
      console.log(event.latLng.k, event.latLng.B)
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

  // test method for creating marker with new challenge
  // $('.new_challenge_test').click(function() {
  //   latitude = markers[markers.length - 1].position.k
  //   longitude = markers[markers.length - 1].position.B
  //   $('.lat').val(latitude)
  //   $('.long').val(longitude)
  // })

  var updateFormFields = function() {
    latitude = markers[markers.length - 1].position.k
    longitude = markers[markers.length - 1].position.B
    $('.lat').val(latitude)
    $('.long').val(longitude)
  }

  // if (document.URL == "http://localhost:3000/map") {
    google.maps.event.addDomListener(window, 'load', initialize);
  // }
})
