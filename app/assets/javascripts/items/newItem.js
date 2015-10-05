$('a#new-button').on('click', function(event) {
  event.preventDefault();
  $('div#item-info').hide();
  $('div#new-item').show();
});

$('form#new-item').on('submit', function(event) {
  event.preventDefault();
  var myForm = document.querySelector('form#new-item');
  formData = new FormData(myForm);
  // var fileInput = document.getElementById('item_image');
  // var file = fileInput.files[0];
  // formData.append('image', file);
  $('div#form-error').hide();

  $.ajax({
    url: '/api/items',
    contentType: false,
    cache: false,
    processData: false,
    type: 'POST',
    dataType: 'json',
    data: formData,
    success: _successOnSubmission,
    error: _errorOnSubmission
  });
});

function _successOnSubmission(data) {
  var myForm = $('form#new-item')[0]
  myForm.reset();
  $('div#new-item').hide();
  $('div#item-info').show();
  var dataView = new Event('dataView');
  myForm.dispatchEvent(dataView);
}

function _errorOnSubmission(data) {
  $('div#form-error').text(data.responseJSON.error);
  $('div#form-error').fadeIn('slow');
}