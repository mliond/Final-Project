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
  $('input#item_location').val("");
  $('input#item_image').val("");
})