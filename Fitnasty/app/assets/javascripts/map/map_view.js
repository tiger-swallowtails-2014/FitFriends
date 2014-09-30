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

  // Removes the markers from the map, but keeps them in the array.
  clearMarkers: function() {
    setAllMap(null);
  },

  // Shows any markers currently in the array.
  showMarkers: function() {
    setAllMap(map);
  }
}

var MapSizer = function(widthProportion, heightProportion, maxHeight, map) {
  this.map = map
  this.maxHeight = maxHeight
  this.mapContainer = map.parent()
  this.mapWidthProportion = widthProportion
  this.mapHeightProportion = heightProportion
  this.initialMapWidth = Math.round(this.mapWidthProportion * this.mapContainer.width()) + 'px'
  this.initialMapHeight = Math.round(this.mapHeightProportion * this.mapContainer.height()) + 'px'
}


MapSizer.prototype = {
  setInitialDimensions: function() {
    this.map.css("width", this.initialMapWidth)
    this.map.css("height", this.initialMapHeight)
  },

  adjustDimensions: function(){
    var currentHeight = parseInt(this.map.css("height").replace("px", ""))
    if (this.mapContainer.height() <= (this.maxHeight / this.mapHeightProportion)) {
      this.map.css("height", this.mapHeightProportion * this.mapContainer.height())
    } else {
      this.map.css("height", this.maxHeight + 'px')
    }
    this.map.css("width", this.mapWidthProportion * this.mapContainer.width())
  }
}


var bindMapDimensionsEvent = function() {
  mapSizer = new MapSizer(1, 0.7, 300, $('#map-canvas'))
  mapSizer.setInitialDimensions()

  $(window).resize(function(){
    mapSizer.adjustDimensions()
  })
}
