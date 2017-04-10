$('document').ready(function() {
  $('.update').on('click', function() {
    // Maybe put these as integers
    let tripId = $(event.target).attr('data-id');
    let userId = $('#userId')[0].innerText;
    console.log(tripId, userId);
    $.ajax({
      method: "POST",
      url: '/trips',
      data: {
        trip_id: tripId,
        user_id: userId
      },
      success: function(stuff) {
        console.log(stuff);
      },
      error: function (error) {
        console.log(error)
      }
    });
  });
});
