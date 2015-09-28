var Map = function(position) {
  this.lat = 51.5;
  this.lng = -0.11;
  this.mapOptions = {
      center: {lat: this.lat, lng: this.lng},
      zoom: 3
  };
};

Map.prototype.initMap = function() {
  var map = new google.maps.Map(document.getElementById('map'), this.mapOptions);
  map.data.loadGeoJson('/api/items');
  map.data.setStyle({
    // icon: 'http://findicons.com/files/icons/1580/devine_icons_part_2/128/trash_recyclebin_empty_closed.png',
    clickable: true
  });

  // map.data.addListener('click', function(event) {
  //   // map.data.setStyle({visible: false});
  //   event.feature.StyleOptions('visible', false);
  // })


  //   // document.getElementById('info-box').textContent =
  //   //     event.feature.getProperty('letter');



}