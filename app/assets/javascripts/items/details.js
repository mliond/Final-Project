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
  item = this.input.getProperty('item')
  _putTextOnDom(item);
  pictures = this.input.getProperty('pictures')
  _putFirstPictureOnDom(pictures[0], 0);
  for(i = 1, length = pictures.length; i < length; ++i) {
    _putPicturesOnDom(pictures[i], i);
  }
}

function _putFirstPictureOnDom(img, i) {
  $('ol.carousel-indicators').append('<li data-target="#carousel-example-generic" data-slide-to="0" class=" active"></li>');
  $('div.carousel-inner').append('<div class="item active"><img src="' + img + '" id="item-image"><div class="carousel-caption">Pic ' + i + '</div></div>');
}

function _putPicturesOnDom(img, i) {
  $('ol.carousel-indicators').append('<li data-target="#carousel-example-generic" data-slide-to="' + i + '"></li>')
  $('div.carousel-inner').append('<div class="item"><img src="' + img + '" id="item-image"><div class="carousel-caption">Pic ' + i + '</div></div>')
}

function _putTextOnDom(item) {
  $('h5#item-name').text(item.name);
  $('h5#item-description').text(item.description);
  $('h5#item-location').text(item.location);
  $('h5#item-created_at').text(item.created_at);
  $('h5#item-claimed').text(item.claimed);
  $('h5#item-id').text(item.id);
  if($('h5#item-claimed').text() === 'false') {
    $('button#claim-button').css('display', 'block');
  } else {
    $('button#claim-button').css('display', 'none');
  };
}