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
    // icon: 'http://findicons.com/files/icons/1580/devine_icons_part_2/128/trash_recyclebin_empty_closed.png',
    clickable: true
  });

  map.data.addListener('click', function(event) {
    $('h5#item-name').text(event.feature.getProperty('name'));
    $('img#item-image').attr('src', event.feature.getProperty('image'));
    $('img#item-image').css('display', 'block');
    $('h5#item-description').text(event.feature.getProperty('description'));
    $('h5#item-location').text(event.feature.getProperty('location'));
    $('h5#item-created_at').text(event.feature.getProperty('created_at'));
    $('h5#item-claimed').text(event.feature.getProperty('claimed'));
    $('h5#item-id').text(event.feature.getProperty('id'));
    if($('h5#item-claimed').text() === 'false') {
      $('button#claim-button').css('display', 'block');
    } else {
      $('button#claim-button').css('display', 'none');
    };
  });
}