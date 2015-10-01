// Gmaps Key: AIzaSyAhrCvig_rV3F4_cO9FUSNpB4eXOE1UMOQ

// Geolocation Object
var Location = function () {
  this.options = {enableHighAccuracy: true};
};

// if browser supports this, geolocate
Location.prototype.locateUser = function() {
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(this.onLocation, this.onError, this.options);
  } else {
    this.onError('no browser support');
  }
}

Location.prototype.onLocation = function(position) {
  var coordinates = position.coords
  Location.coords = coordinates;
  sessionStorage.setItem('coordinates', coordinates);
};

// If error, set coordinates to Carrer de Bailen 11, Barcelona
Location.prototype.onError = function(error) {
  console.log(error);
  coordsBarcelona = {latitude: 41.39167454068234, longitude: 2.1771672234719244};
  Location.coords = coordsBarcelona;
};

// Locate user
function locateUser() {
  // if(!(sessionStorage.getItem('coordinates'))){
  if(true){
    var myLocation = new Location;
    var position = myLocation.locateUser();
  };
}

// Initialize Map
function initializeMap() {
  var s = document.createElement("script");
  s.type = "text/javascript";
  s.src  = "https://maps.googleapis.com/maps/api/js?key=AIzaSyAhrCvig_rV3F4_cO9FUSNpB4eXOE1UMOQ&sensor=true&callback=gmap_draw&libraries=places";
  window.gmap_draw = function(){
    var map = new Map;
    map.initMap();
  };
  $("head").append(s);
};

$(document).ready(function(){
  $.when(locateUser()).done([initializeMap()]);
});

// Map Object
var Map = function () {
  this.currentId = 0;
  this.lat = Location.coords.latitude; // geolocation from before
  this.lng = Location.coords.longitude; // geolocation from before
  this.mapDiv = document.getElementById('map-index');
  var noPlaces = [ // no POI style for below
  {
      featureType: "poi",
      stylers: [
        { visibility: "off" }
      ]
    },
  {
      featureType: "transit",
      stylers: [
        { visibility: "off" }
      ]
    }
  ];
  this.mapOptions = { // several options for the initial map
    center: {lat: this.lat, lng: this.lng},
    zoom: 15,
    streetViewControl: false,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    mapTypeControl: false,
    scrollwheel: false,
    styles: noPlaces
  };
};

Map.prototype.initMap = function() {
  var map = new google.maps.Map(this.mapDiv, this.mapOptions);
  toggleIdleListener(true);

  // Show or hide data layer
  function toggleDataLayer(command) {
    if(command === true){
      Map.dataLayer.setMap(map);
    } else {
      Map.dataLayer.setMap(null);
    };
  };

  // Set style for layer's icons
  function styleDataLayer() {
    Map.dataLayer.setStyle(function(feature) {
      if(feature.getProperty('claimed') === true) {
        var icon = 'http://google.com/mapfiles/ms/micons/' + 'ltblue-dot' + '.png';
      } else {
        var icon = 'http://google.com/mapfiles/ms/micons/' + 'blue-dot' + '.png';
      }
      if(feature.getProperty('isColorful')) {
        var icon = 'http://google.com/mapfiles/ms/micons/' + 'yellow-dot' + '.png';
      }
      return {
        clickable: true,
        icon: icon
      };
    });
  };

  // Dom manipulation
  function changeDom(event) {
    var putInDom = new ChangeDom(event.feature);
    putInDom.putOnPage();
  }

  // Add listener for DOM manipulation on click
  function domStyleDataLayer() {
    var currentId = 0;
    Map.dataLayer.addListener('click', function(event) {
      changeDom(event);
      if(!(currentId === event.feature.getId())){
        if(!(currentId === 0)){
          var prevFeature = Map.dataLayer.getFeatureById(currentId);
          prevFeature.setProperty('isColorful', false);
        }
        currentId = event.feature.getId();
      }
      event.feature.setProperty('isColorful', true);
    });
  };

  // if user claims item, reload data
  function listenToClaim() {
    var claimButton = $('button#claim-button')[0];
    google.maps.event.addDomListener(claimButton, 'click', function() {
      reloadData();
    });
  };

  // if user clicks checkbox, change data
  function listenToUnclaimedCheckbox() {
    var unclaimedCheckbox = $('input#unclaimed-checkbox')[0];
    google.maps.event.addDomListener(unclaimedCheckbox, 'change', function() {
      reloadData();
    });
  }

  // This creates a data layer on the map
  function showDataLayer(data) {
    Map.dataLayer = new google.maps.Data();
    var cachedData = data;
    Map.dataLayer.addGeoJson(cachedData, {idPropertyName:"id"});
    styleDataLayer();
    domStyleDataLayer();
    toggleDataLayer(true);
  }

  // Load markers in the viewport from API
  function loadPoints() {
    if(Map.dataLayer) {
      toggleDataLayer(false);
    }
    var unclaimedBoolean = $('input#unclaimed-checkbox').is(':checked');
    var bounds = map.getBounds().toUrlValue();
    var data = $.ajax({
      dataType: "json",
      url: '/api/items',
      data: {viewport: bounds, unclaimed: unclaimedBoolean},
      async: false, // needs to load first
      success: showDataLayer
    });
  };

  function reloadData() {
    loadPoints();
  };

  function loadFirst() {
    reloadData();
    listenToClaim();
    listenToUnclaimedCheckbox();
  }

  function toggleIdleListener(command) {
    map.addListener('idle', loadFirst);
    if(command === false){
      google.maps.event.clearListeners(map, 'idle');
    };
  };

  function createNewMarker() {
    var centerMap = map.getCenter();
    var marker = new google.maps.Marker({
      position: centerMap,
      icon: 'http://google.com/mapfiles/ms/micons/' + 'yellow-dot' + '.png',
      draggable: true,
      title:"Drag me"
    });
    return marker
  }

  // show or hide specified marker
  function toggleMarker(command) {
    if(command === true){
      Map.marker.setMap(map);
    } else {
      Map.marker.setMap(null);
    };
  }

  // takes marker's location and puts its address in DOM
  function reverseGeocode(coordinates) {
    var geocoder = new google.maps.Geocoder;
    geocoder.geocode( { 'location': coordinates}, function(results) {
      var result = results[0].formatted_address;
      $('input#item_location').val(result);
    });
  }

  // Add listeners for geocoding
  function styleMarker(marker) {
    marker.addListener('dragend', function() {
      var locat = marker.getPosition();
      reverseGeocode(locat);
    });
  }

  // When clicking the new button, remove data layer, add draggable marker
  var newButton = $('a#new-button')[0];
  google.maps.event.addDomListener(newButton, 'click', function() {
    toggleDataLayer(false);
    toggleIdleListener(false);
    Map.marker = createNewMarker();
    toggleMarker(true);
    styleMarker(Map.marker);
  })

  // When submitting the form, remove marker, show data layer
  var submitForm = $('form#new-item')[0];
  google.maps.event.addDomListener(submitForm, 'submit', function() {
    toggleMarker(false);
    reloadData();
    toggleIdleListener(true);
  });

  // initialize Autocomplete in the location input
  var locationInput = $('input#item_location')[0];
  var options = {bounds: map.getBounds()}
  autocomplete = new google.maps.places.Autocomplete(locationInput, options);
};