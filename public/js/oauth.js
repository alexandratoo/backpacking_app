function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  console.log('Name: ' + profile.getName());
  console.log('Image URL: ' + profile.getImageUrl());
  console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
  console.log('given name: ' + profile.getGivenName()); // This is null if the 'email' scope is not present.
  console.log('family name: ' + profile.getFamilyName()); // This is null if the 'email' scope is not present.

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
      console.log('done');
    },
    error: function(error) {
      console.log(error);
    }
  });

  console.log(googleUser.getAuthResponse(true).access_token)
  console.log(googleUser.getAuthResponse(true).id_token)
}

function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('User signed out.');
  });
}
