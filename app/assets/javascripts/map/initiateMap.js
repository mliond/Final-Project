
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
      zoom: 15,
      streetViewControl: false,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      mapTypeControl: false
  };

  var map = new google.maps.Map(document.getElementById('map-index'), mapOptions);


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
  // var promise = $.getJSON("/api/items");
  //       promise.then(function(data){
  //         cachedGeoJson = data; //save the geojson in case we want to update its values
  //         map.data.addGeoJson(cachedGeoJson,{idPropertyName:"id"}); 
  //       }); 

  // Load JSON data
  var promise = $.getJSON("/api/items");
        promise.then(function(data){
          cachedGeoJson = data; //save the geojson in case we want to update its values
          layer_1 = new google.maps.Data();
          layer_1.addGeoJson(cachedGeoJson,{idPropertyName:"id"}); 
          layer_1.setMap(map);

          // Set style for icons
          layer_1.setStyle(function(feature) {
            if(feature.getProperty('claimed') === true) {
              var icon = 'http://google.com/mapfiles/ms/micons/' + 'ltblue-dot' + '.png';
            } else {
              var icon = 'http://google.com/mapfiles/ms/micons/' + 'blue-dot' + '.png';
            }
            if(feature.getProperty('isColorful')) {
              var icon = 'http://google.com/mapfiles/' + 'arrow' + '.png';
            }
            return {
              clickable: true,
              icon: icon
            };
          });

          // Add listener for DOM manipulation
          var currentId = 0;
          layer_1.addListener('click', function(event) {
            changeDom(event);
            if(!(currentId === event.feature.getId())){
              if(!(currentId === 0)){
                var prevFeature = layer_1.getFeatureById(currentId);
                prevFeature.setProperty('isColorful', false);
              }
              currentId = event.feature.getId();
            }
            event.feature.setProperty('isColorful', true);
          });
        });

  function changeDom(event) {
    var putInDom = new ChangeDom(event.feature);
    putInDom.putOnPage();
  }
}