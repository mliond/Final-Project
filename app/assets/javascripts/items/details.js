$('button#claim-button').on('click', function() {
  var itemId = $('h5#item-id').text();
  var itemClaimed = true;

  $.ajax({
    method: "PUT",
    url: '/api/items/' + itemId,
    data: {item: {claimed: itemClaimed}}
  });

  $('button#claim-button').hide();
})