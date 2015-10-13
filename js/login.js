 $(function () {});
 Parse.$ = jQuery;
 Parse.initialize("9jmo7iQvHaOETLW3a1bABEtverssotdOa85CFCBn", "XKTqDypOYCp4GojAzdW7TxHT6xMuVufCYaSgNLlH");
 var currentUser = Parse.User.current();
 if (currentUser) {
     // do stuff with the user
     window.location.href = "map.html";
 } else {
     //window.location.href = "/";
     // show the signup or login page
     //Parse.User.logOut();
 }
 $(document).ready(function () {
     $("#submit").click(function (form) {
         tryLogin(form);
     })

     $("#logout").click(function () {
         logout();
     })

     function logout() {
         Parse.User.logOut();
     }

     function tryLogin(form) {
         var username = $("#username").val()
         var password = $("#password").val()
         Parse.User.logIn(username, password, {
             success: function (user) {
                 window.location.href = "map.html";
                 //self.undelegateEvents();
                 //delete self;
                 return true;
             },
             error: function (user, error) {
                 alert("invalid username and password");
                 return false;
             }
         });
     }
 })