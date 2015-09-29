// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require_tree .

var myLocation = new Location;
var position = myLocation.locateUser();

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
