 $(function () {});
 Parse.$ = jQuery;
 Parse.initialize("9jmo7iQvHaOETLW3a1bABEtverssotdOa85CFCBn", "XKTqDypOYCp4GojAzdW7TxHT6xMuVufCYaSgNLlH");
 var currentUser = Parse.User.current();
 $(document).ready(function () {
     var object = [];
     var GameScore = Parse.Object.extend("User");
     var query = new Parse.Query(GameScore);
     query.find({
         success: function (results) {
             for (var i = 0; i < results.length; i++) {
                 var data = results[i];
                 var user = [];
                 user.push(data.get("username"));
                 user.push(data.get("username"));
                 user.push(data.get("username"));
                 user.push(data.get("username"));
                 data["username"] = data.get("username");
                 data["email"] = data.get("email");
                 data["phone"] = data.get("phone");
                 object.push(data);
             }
             $('#driverTable').dataTable({
                 //                 "ajax": "data/drivers.txt",
                 "data": object,
                 "columns": [
                     {
                         "data": "id"
             },
                     {
                         "data": "username"
             },
                     {
                         "data": "phone"
             },
                     {
                         "data": "email"
             }
        ]
             });

         },
         error: function (error) {
             alert("Error: " + error.code + " " + error.message);
         }
     });

 })