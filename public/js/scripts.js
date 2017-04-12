$('document').ready(function() {
  // $('.update').on('click', function() {
  //   // Maybe put these as integers
  //   let tripId = $(event.target).attr('data-id');
  //   let userId = $('#userId')[0].innerText;
  //   console.log(tripId, userId);
  //   $.ajax({
  //     method: "POST",
  //     url: '/trips',
  //     data: {
  //       trip_id: tripId,
  //       user_id: userId
  //     },
  //     success: function(stuff) {
  //       console.log(stuff);
  //     },
  //     error: function (error) {
  //       console.log(error)
  //     }
  //   });
  // });

  $(".updateButton").on("click", function(event) {
    event.preventDefault();
    let data = $(event.target).closest('form').serialize();
    console.log(data);
    $.ajax({
      method: "PUT",
      url: "/admin",
      data: data,
      success: function(done) {
        if(done){
          location.reload();
        }
      },
      error: function(error) {
        console.log(error);
      }
    });
  });

  $(".deleteButton").on("click", function() {
    let id = (this.id).slice(1);
    console.log(id);
    $.ajax({
      method: "DELETE",
      url: "/admin",
      data: {
        id: id
      },
      success: function(done) {
        if(done) {
          location.reload();
        }
      },
      error: function(error) {
        console.log(error);
      }
    });
  });

  $('#myModal').on('shown.bs.modal', function () {
    $('#myInput').focus();
  });

});
