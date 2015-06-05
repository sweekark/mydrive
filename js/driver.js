 $(function () {});
 Parse.$ = jQuery;
 Parse.initialize("9jmo7iQvHaOETLW3a1bABEtverssotdOa85CFCBn", "XKTqDypOYCp4GojAzdW7TxHT6xMuVufCYaSgNLlH");
 var currentUser = Parse.User.current();
 $(document).ready(function () {
     $('#driverTable').dataTable({
         "ajax": "data/drivers.txt",
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
             }
        ]
     });
 })