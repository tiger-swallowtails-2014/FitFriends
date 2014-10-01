MapView = {
  // Add a marker to the map and push to the array.
  addMarker: function(location) {
    var marker = new google.maps.Marker({
      position: location,
      map: map,
      animation: google.maps.Animation.DROP
    });
    markers.push(marker);
  },

  updateFormFields: function() {
    latitude = markers[markers.length - 1].position.k
    longitude = markers[markers.length - 1].position.B
    $('.lat').val(latitude)
    $('.long').val(longitude)
    MapModel.reverseGeocode(latitude, longitude)
  },

  // sets coordinates for an array of challenges
  setMarkers: function(array) {
    for (var i = 0; i < array.length; i++) {
      position = new google.maps.LatLng(array[i].latitude, array[i].longitude);
      MapView.addMarker(position)
    }
  },

  // Sets the map on all markers in the array.
  setAllMap: function(map) {
    for (var i = 0; i < markers.length; i++) {
      markers[i].setMap(map);
    }
  },

  // Removes the markers from the map, but keeps them in the array.
  clearMarkers: function() {
    MapView.setAllMap(null);
  },

  // Shows any markers currently in the array.
  showMarkers: function() {
    MapView.setAllMap(map);
  },

  // Deletes all markers in the array by removing references to them.
  deleteMarkers: function() {
    MapView.clearMarkers();
    markers = [];
  },

  deleteLastMarker: function() {
    markers[markers.length - 1].setMap(null)
    markers.pop();
  }
}



// This is the function that resizes the map width
var MapSizer = function(widthProportion, map) {
  this.map = map
  this.mapContainer = map.parent()
  this.mapWidthProportion = widthProportion
  this.initialMapWidth = Math.round(this.mapWidthProportion * this.mapContainer.width()) + 'px'
}


MapSizer.prototype = {
  setInitialDimensions: function() {
    this.map.css("width", this.initialMapWidth)
  },

  adjustDimensions: function(){
    this.map.css("width", this.mapWidthProportion * this.mapContainer.width())
  }
}


var bindMapDimensionsEvent = function() {
  mapSizer = new MapSizer(1, $('#map-canvas'))
  mapSizer.setInitialDimensions()

  $(window).resize(function(){
    mapSizer.adjustDimensions()
  })
}
