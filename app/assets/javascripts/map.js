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
    map.data.setStyle({visible: false});
  })


  //   // document.getElementById('info-box').textContent =
  //   //     event.feature.getProperty('letter');



}