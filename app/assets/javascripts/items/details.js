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

var ChangeDom = function(input) {
  this.input = input;
}

ChangeDom.prototype.putOnPage = function() {
  $('h5#item-name').text(this.input.getProperty('name'));
  $('img#item-image').attr('src', this.input.getProperty('image'));
  $('h5#item-description').text(this.input.getProperty('description'));
  $('h5#item-location').text(this.input.getProperty('location'));
  $('h5#item-created_at').text(this.input.getProperty('created_at'));
  $('h5#item-claimed').text(this.input.getProperty('claimed'));
  $('h5#item-id').text(this.input.getProperty('id'));
  if($('h5#item-claimed').text() === 'false') {
    $('button#claim-button').css('display', 'block');
  } else {
    $('button#claim-button').css('display', 'none');
  };
}