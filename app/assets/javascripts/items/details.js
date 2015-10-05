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

ChangeDom.prototype.showItem = function() {
  var itemId = (this.input.getProperty('item').id)
  $.ajax({
    method: "GET",
    url: '/api/items/' + itemId,
    success: _changePage
  });
}

function _changePage(data) {
  _emptyTheHTML();
  _putTextOnDom(data.item, data.created_at);
  pictures = data.pictures;
  _putFirstPictureOnDom(pictures[0]);
  for(i = 1, length = pictures.length; i < length; ++i) {
    _putPicturesOnDom(pictures[i], i);
  }
}

function _emptyTheHTML() {
  $('#item-info ol.carousel-indicators').empty();
  $('#item-info div.carousel-inner').empty();
}

function _putFirstPictureOnDom(img) {
  $('#item-info ol.carousel-indicators').append('<li data-target="#carousel-example-generic" data-slide-to="0" class="active"></li>');
  $('#item-info div.carousel-inner').append('<div class="item active"><img src="'+img+'" alt="..."><div class="carousel-caption">..Caption..</div>');
}

function _putPicturesOnDom(img, i) {
  $('#item-info ol.carousel-indicators').append('<li data-target="#carousel-example-generic" data-slide-to="1"></li>')
  $('#item-info div.carousel-inner').append('<div class="item"><img src="'+img+'" alt="..."><div class="carousel-caption">Caption</div></div>')
}

function _putTextOnDom(item, createdAt) {
  $('h5#item-name').text(item.name);
  $('h5#item-description').text(item.description);
  $('h5#item-location').text(item.location);
  $('h5#item-created_at').text(createdAt);
  $('h5#item-claimed').text(item.claimed);
  $('h5#item-id').text(item.id);
  if($('h5#item-claimed').text() === 'false') {
    $('button#claim-button').css('display', 'block');
  } else {
    $('button#claim-button').css('display', 'none');
  };
}