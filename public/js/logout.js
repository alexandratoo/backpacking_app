$(document).ready(function() {

    function signOut() {
      console.log(gapi);
        gapi.load('auth2', function() {
            gapi.auth2.init().then(function() {
                var auth2 = gapi.auth2.getAuthInstance();
                console.log(auth2);
                auth2.signOut().then(function() {
                    auth2.disconnect();
                    document.location = '/'
                });
            })
        });
    };

    $('.logout').click(function(event) {
        signOut();
    })

})
