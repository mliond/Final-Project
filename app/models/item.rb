class Item < ActiveRecord::Base

#Gmaps Key: AIzaSyAhrCvig_rV3F4_cO9FUSNpB4eXOE1UMOQ

  geocoded_by :location
  after_validation :geocode

end
