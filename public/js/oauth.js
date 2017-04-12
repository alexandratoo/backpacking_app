function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();

  let data = {
    first_name: profile.getGivenName(),
    last_name: profile.getFamilyName(),
    photo: profile.getImageUrl(),
    email: profile.getEmail()
  }

  $.ajax({
    method: "POST",
    url: "/",
    data: data,
    success: function(done) {
      if (done) {
        document.location = '/admin';
      }
    },
    error: function(error) {
      console.log(error);
    }
  });

  let accessToken = googleUser.getAuthResponse(true).access_token
  let idToken = googleUser.getAuthResponse(true).id_token
}

function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('User signed out.');
  });
}
