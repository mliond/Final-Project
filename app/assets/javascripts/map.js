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

  var marker = new google.maps.Marker({
     position: {lat: -25.363, lng: 131.044},
     map: map,
     title: 'Click to zoom'
   });

  // map.data.addListener('click', function(event) {
  //   // map.data.setStyle({visible: false});
  //   $('h5.item-name').text('1');
  //   $('h5.item-description').text('2');
  //   $('h5.item-location').text('3');
  //   $('h5.item-created_at').text('4');
  // })

  map.data.addListener('click', function(event) {
      $('h5.item-name').text(event.feature.getProperty('name'));
      $('h5.item-description').text(event.feature.getProperty('description'));
      $('h5.item-location').text(event.feature.getProperty('location'));
      $('h5.item-created_at').text(event.feature.getProperty('created_at'));
    });


  //   // document.getElementById('info-box').textContent =
  //   //     event.feature.getProperty('letter');



}