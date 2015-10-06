$('div#edit-button-wrapper').on('click', 'a#edit-item', function(event) {
  event.preventDefault();
  $('div#item-info').hide();
  $('div#edit-item').show();
})

$('form#edit-item').on('submit', function(event) {
  event.preventDefault();
  var itemId = $('input#item_id').val();
  var itemName = $('input#item_name').val();
  var itemLocation = $('input#item_location').val();
  var itemClaimed = $('input#item_claimed').is(':checked');

  $.ajax({
    method: "PUT",
    url: '/api/items/' + itemId,
    data: {item: {name: itemName, location: itemLocation, claimed: itemClaimed}}
  })

  $('input#item_name').val("");
  $('input#item_location').val("");
  $('input#item_claimed').attr("checked", false);
})