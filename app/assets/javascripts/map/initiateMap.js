// Gmaps Key: AIzaSyAhrCvig_rV3F4_cO9FUSNpB4eXOE1UMOQ

// if browser supports this, geolocate
var Location = function () {
  this.options = {enableHighAccuracy: true};
};

Location.prototype.locateUser = function() {
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(this.onLocation, this.onError, this.options);
  } else {
    console.log('geo is not available')
  }
}

Location.prototype.onLocation = function(position) {
  Location.coords = position.coords;
};

Location.prototype.onError = function(error) {
  console.log(error);
};

// once page is loaded, start map
$(document).ready(function(){
   var s = document.createElement("script");
   s.type = "text/javascript";
   s.src  = "https://maps.googleapis.com/maps/api/js?key=AIzaSyAhrCvig_rV3F4_cO9FUSNpB4eXOE1UMOQ&sensor=true&callback=gmap_draw";
   window.gmap_draw = function(){
       var map = new Map;
       map.initMap();
   };
   $("head").append(s);
});

Map.prototype.initMap = function() {
  var lat = Location.coords.latitude;
  var lng = Location.coords.longitude;

  var mapOptions = {
      center: {lat: lat, lng: lng},
      zoom: 15
  };

  var map = new google.maps.Map(document.getElementById('map'), mapOptions);
  map.data.loadGeoJson('/api/items');
  map.data.setStyle({
    icon: 'https://www.google.com/mapfiles/marker_green.png',
    clickable: true
  });

  map.data.addListener('click', function(event) {
    var putInDom = new ChangeDom(event.feature);
    putInDom.putOnPage();
    event.feature.setProperty('isColorful', true);
    // event.feature.setIcon('https://www.google.com/mapfiles/marker_green.png');
  });
}