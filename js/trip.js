 $(function () {});
 Parse.$ = jQuery;
 Parse.initialize("9jmo7iQvHaOETLW3a1bABEtverssotdOa85CFCBn", "XKTqDypOYCp4GojAzdW7TxHT6xMuVufCYaSgNLlH");
 var currentUser = Parse.User.current();
 if (currentUser) {} else {
     // show the signup or login page
     //Parse.User.logOut();
 }

 var map;

 // function initialize() {
 //     var mapOptions = {
 //         zoom: 8,
 //         center: new google.maps.LatLng(-34.397, 150.644)
 //     };
 //     map = new google.maps.Map(document.getElementById('trip-canvas'),
 //         mapOptions);
 // }
 function initialize() {
     var directionsDisplay;
     var directionsService = new google.maps.DirectionsService();
     var map;

     //function initialize() {
     directionsDisplay = new google.maps.DirectionsRenderer();
     var chicago = new google.maps.LatLng(41.850033, -87.6500523);
     var mapOptions = {
         zoom: 7,
         //center: chicago
         center: new google.maps.LatLng(0, -180)
     };
     map = new google.maps.Map(document.getElementById('trip-canvas'), mapOptions);
     directionsDisplay.setMap(map);
     //}

     //function calcRoute() {

     var GameScore = Parse.Object.extend("Location");
     var query = new Parse.Query(GameScore);
     // query.equalTo("userID", userid);
     var date = new Date();
     query.descending("createdAt");
     // query.greaterThanorEqualTo("createdAt",date.getDate());
     query.limit(1000);
     var start;
     query.find({
         success: function (results) {
             for (var i = 0; i < results.length; i++) {
                 var object = results[i];
                 if (object.get("checkIn") == true) {
                     //  drawMarker(object, map);
                 } else {
                     if (i == 0) {
                         start = new google.maps.LatLng(object.get("location").latitude, object.get("location").longitude);
                     }
                     if (i == (results.length - 1)) {
                         end = new google.maps.LatLng(object.get("location").latitude, object.get("location").longitude);
                     }
                 }
             }

             //var start = new google.maps.LatLng(12.937070, 77.626605);

             //end = new google.maps.LatLng(12.957026, 77.700714);
             end = new google.maps.LatLng(12.9119628556504, 77.5845909118652);


             //var start = 'Chicago';
             //var end = 'Joplin, MO';
             var request = {
                 origin: start,
                 destination: end,
                 travelMode: google.maps.TravelMode.DRIVING
             };
             directionsService.route(request, function (response, status) {
                 if (status == google.maps.DirectionsStatus.OK) {
                     directionsDisplay.setDirections(response);
                 }
             });
         }
     });
     //}

     //    google.maps.event.addDomListener(window, 'load', initialize);

 }

 google.maps.event.addDomListener(window, 'load', initialize);


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
     var table = $('#example').DataTable();

     $('#example tbody').on('click', 'tr', function () {
         if ($(this).hasClass('selected')) {
             $(this).removeClass('selected');
         } else {
             table.$('tr.selected').removeClass('selected');
             $(this).addClass('selected');
         }
     });

     $('#button').click(function () {
         table.row('.selected').remove().draw(false);
     });
 })