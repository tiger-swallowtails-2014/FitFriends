var geocoder;
var map;
var infowindow = new google.maps.InfoWindow();
var markers = [];
var challenges = [];

var MapModel = {
  reverseGeocode: function(lat, lng) {
    var latlng = new google.maps.LatLng(lat, lng);
    geocoder.geocode({'latLng': latlng}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        if (results[1]) {
          var marker = markers[markers.length - 1]
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
  },

  // Geocoding an address
  codeAddress: function() {
    var address = document.getElementById('address').value;
    geocoder.geocode( { 'address': address}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        map.setCenter(results[0].geometry.location);
        MapView.addMarker(results[0].geometry.location)
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
  }
}