$('form#edit-item').on('submit', function(event) {
  event.preventDefault();
  var item_id = $('input#item_id').val();
  var item_name = $('input#item_name').val();
  var item_location = $('input#item_location').val();
  var item_claimed = $('input#item_claimed').is(':checked');

  $.ajax({
    method: "PUT",
    url: '/api/items/' + item_id,
    data: {item: {name: item_name, location: item_location, claimed: item_claimed}}
  })

  $('input#item_name').val("");
  $('input#item_location').val("");
  $('input#item_claimed').attr("checked", false);
})