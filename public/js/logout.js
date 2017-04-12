$(document).ready(function() {

  var revokeAllScopes = function() {
    auth2.disconnect();
  }

    function signOut() {
        gapi.load('auth2', function() {
            gapi.auth2.init().then(function(){
              var auth2 = gapi.auth2.getAuthInstance();
              console.log(auth2);
              auth2.signOut().then(function() {
                  console.log('User signed out.');
                  auth2.disconnect();
                  document.location = '/'
              });
            })
        });
    };

    $('.logout').click(function(event) {
      console.log('clicked');
    signOut();
    })
})
