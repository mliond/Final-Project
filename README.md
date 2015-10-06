# Ironhack-Final-Project

Day 1: Set up development environment. Created item model, map. User can locate herself, add items, edit items.

Day 2: Built basic layout. Right side map. Left side details. If user clicks marker on map, the respective details are shown through jQuery. Enabled picture upload and association with Item model through Paperclip gem and Formdata.

Day 3: Embedded creating a new instance through jQuery. Toggle between map data view and marker for this functionality. User can drag marker to find location, which triggers a reverse geocode through Google API. Shows readable address in the location input.

Day 4: Refactored JS, added Autocomplete form, map only loads viewport, toggle between unclaimed and all items. Minor: Turned off map POI and transit data, which was distracting from the data.

Day 5: Removed Geocoder gem and implemented Google Maps Geocode instead. Put autocomplete location into the map, which can move the marker. Created picture model, which belongs to item, therefore enabling multiple pictures. Minor: Used lower quality images for faster loading. Implemented Bootstrap Caroussel for pictures.

Day 6: Played around with Devise gem, trying to build an API version of it. Implemented more layout, such as Navbar and Footer and a jQuery animation on first click.

Day 7: Used Google geolocalization (less code), implemented users (with bcrypt + sessions), items belong to users who are allowed to edit their own ones. Adapted frontend to these changes. Successfully deployed to Heroku.