$('form#new-item').on('submit', function(event) {
  event.preventDefault();
  var newItem = {item: {name: $('input#item_name').val(), location: $('input#item_location').val()}};
  $.post('/api/items', newItem);
  $('input#item_name').val("");
  $('input#item_location').val("");
})