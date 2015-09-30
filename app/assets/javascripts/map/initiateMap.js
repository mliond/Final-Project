
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

$(document).ready(function(){
  if(!(Location.coords)){
    var myLocation = new Location;
    var position = myLocation.locateUser();
  }
})

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

var Map = function () {
  this.currentId = 0; 
};

Map.prototype.initMap = function() {
  var lat = Location.coords.latitude;
  var lng = Location.coords.longitude;

  var mapOptions = {
      center: {lat: lat, lng: lng},
      zoom: 15
  };

  var map = new google.maps.Map(document.getElementById('map'), mapOptions);


  // Alternative: Load JSON and make a marker for each object. Just has position so far
  //       var promise = $.getJSON("/api/items");
  //             promise.then(function(data){
  //               cachedGeoJson = data; 

  // // Make Markers out of the data
  //            for (var i = 0; i < cachedGeoJson.features.length; i++) {
  //              var coords = cachedGeoJson.features[i].geometry.coordinates;
  //              var latLng = new google.maps.LatLng(coords[1],coords[0]);
  //              var marker = new google.maps.Marker({
  //                position: latLng,
  //                clickable: true,
  //                icon: 'https://www.google.com/mapfiles/marker_black.png',
  //                title: 'test',
  //                map: map
  //              });
  //              console.log(marker.getAttribution('title'));

  //              marker.addListener('click', function() {
  //                  map.setZoom(19);
  //                  map.setCenter(marker.getPosition());
  //                  marker.setStyle({
  //                   icon: 'https://www.google.com/mapfiles/marker_black.png'
  //                 });
  //                });
  //            };
  //          });






  // Load JSON data
  var promise = $.getJSON("/api/items");
        promise.then(function(data){
          cachedGeoJson = data; //save the geojson in case we want to update its values
          map.data.addGeoJson(cachedGeoJson,{idPropertyName:"id"}); 
        });

  map.data.setStyle(function(feature) {
    var icon = 'https://www.google.com/mapfiles/marker_black.png';
    if(feature.getProperty('isColorful')) {
      icon = 'https://www.google.com/mapfiles/marker_green.png';
    }
    return {
      clickable: true,
      icon: icon
    };
  });

  var currentId = 0;

  map.data.addListener('click', function(event) {
    changeDom(event);
    if(!(currentId === event.feature.getId())){
      if(!(currentId === 0)){
        var prevFeature = map.data.getFeatureById(currentId);
        prevFeature.setProperty('isColorful', false);
      }
      currentId = event.feature.getId();
    }
    event.feature.setProperty('isColorful', true);
    });

  function changeDom(event) {
    var putInDom = new ChangeDom(event.feature);
    putInDom.putOnPage();
  }
}