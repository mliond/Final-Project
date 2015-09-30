$('a#new-button').on('click', function(event) {
  event.preventDefault();
  $('div#item-info').hide();
  $('div#new-item').show();
  $('div#map-index').hide();
  $('div#map-new-item').show();
  
});

$('form#new-item').on('submit', function(event) {
  event.preventDefault();
  var myForm = document.querySelector('form#new-item');
  formData = new FormData(myForm);
  var fileInput = document.getElementById('item_image');
  var file = fileInput.files[0];
  formData.append('image', file);

  $.ajax({
    url: '/api/items',
    contentType: false,
    cache: false,
    processData: false,
    type: 'POST',
    dataType: 'json',
    data: formData
  });

  $('input#item_name').val("");
  $('input#item_description').val("");
  $('input#item_location').val("");
  $('input#item_image').val("");
  $('div#new-item').hide();
  $('div#item-info').show();
  $('div#map-new-item').hide();
  $('div#map-index').show();
})