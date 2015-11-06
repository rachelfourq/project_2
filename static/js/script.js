$(document).ready(function(){

  $('select').material_select();

  $('.delete-btn').click(function(e) {
    e.preventDefault();
    var id = $(this).data('id');
    // var well = $(this).parent();
    $.ajax({
      url: '/delete/' + id,
      method: 'DELETE'
    }).done(function(data) {
  		window.location = "/";
    });
  });


  $('.modal-trigger').leanModal();



});