 $(function () {});
 Parse.$ = jQuery;
 Parse.initialize("9jmo7iQvHaOETLW3a1bABEtverssotdOa85CFCBn", "XKTqDypOYCp4GojAzdW7TxHT6xMuVufCYaSgNLlH");
 var currentUser = Parse.User.current();
 if (currentUser) {} else {
     // show the signup or login page
     //Parse.User.logOut();
 }
 $(document).ready(function () {
     $('#example').dataTable({
         "ajax": "data/objects.txt",
         "columns": [
             {
                 "data": "name"
             },
             {
                 "data": "position"
             },
             {
                 "data": "office"
             },
             {
                 "data": "extn"
             },
             {
                 "data": "start_date"
             },
             {
                 "data": "salary"
             }
        ]
     });

     $("#submit").click(function () {
         tryLogin();
     })

     function tryLogin(form) {

         var username = "sweekar" //form.username.value;
         var password = "sweekar" //form.password.value;

         console.log("Username: " + username + " Password: " + password);
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