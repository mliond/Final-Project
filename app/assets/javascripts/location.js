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