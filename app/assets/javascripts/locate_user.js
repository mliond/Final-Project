var Location = function () {
  this.options = {enableHighAccuracy: true};
};

Location.prototype.locate_user = function() {
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(this.onLocation, this.onError, this.options);
  } else {
    console.log('geo is not available')
  }
}

Location.prototype.onLocation = function(position) {
  // console.log('your lat is ' + position.coords.latitude);
  // console.log('your lon is ' + position.coords.longitude);
  console.log(position);
  return position.coords;
};

Location.prototype.onError = function(error) {
  console.log(error);
};