
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
  var mapDiv = document.getElementById('map-index');

  var mapOptions = {
      center: {lat: lat, lng: lng},
      zoom: 15,
      streetViewControl: false,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      mapTypeControl: false
  };

  var map = new google.maps.Map(mapDiv, mapOptions);


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
          dataLayer = new google.maps.Data();
          dataLayer.addGeoJson(cachedGeoJson,{idPropertyName:"id"}); 
          toggleDataLayer(true);

          function toggleDataLayer(input) {
            if(input === true){
              dataLayer.setMap(map);
            } else {
              dataLayer.setMap(null);
            };
          };

          // Set style for icons
          dataLayer.setStyle(function(feature) {
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
          dataLayer.addListener('click', function(event) {
            changeDom(event);
            if(!(currentId === event.feature.getId())){
              if(!(currentId === 0)){
                var prevFeature = dataLayer.getFeatureById(currentId);
                prevFeature.setProperty('isColorful', false);
              }
              currentId = event.feature.getId();
            }
            event.feature.setProperty('isColorful', true);
          });

          // When hitting the new button, remove data layer, add draggable marker
          var newButton = $('a#new-button')[0];

          google.maps.event.addDomListener(newButton, 'click', function() {
            toggleDataLayer(false);
            var marker = new google.maps.Marker({
              position: {lat: lat, lng: lng},
              icon: 'http://google.com/mapfiles/ms/micons/' + 'blue-dot' + '.png',
              draggable: true,
              title:"Drag me!"
            });

            function toggleMarker(input){
              if(input === true){
                marker.setMap(map);
              } else {
                marker.setMap(null);
              };
            };

            toggleMarker(true);

            var submitButton = $('form#new-item')[0];
            marker.addListener('dragend', function() {
              var locat = marker.getPosition();

              // Reverse geocode the new location and put in DOM
              var geocoder = new google.maps.Geocoder;
              geocoder.geocode( { 'location': locat}, function(results) {
                var result = results[0].formatted_address;
                $('input#item_location').val(result);
              });
            });

            // Remove marker, go back to Data view
            var submitForm = $('form#new-item')[0];
            google.maps.event.addDomListener(submitForm, 'submit', function() {
              toggleDataLayer(true);
              toggleMarker(false);
            })

          });


        });


  function changeDom(event) {
    var putInDom = new ChangeDom(event.feature);
    putInDom.putOnPage();
  }
}