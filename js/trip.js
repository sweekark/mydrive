 $(function () {});
 Parse.$ = jQuery;
 Parse.initialize("9jmo7iQvHaOETLW3a1bABEtverssotdOa85CFCBn", "XKTqDypOYCp4GojAzdW7TxHT6xMuVufCYaSgNLlH");
 var currentUser = Parse.User.current();
 if (currentUser) {} else {
     // show the signup or login page
     //Parse.User.logOut();
 }
 if (!currentUser) {
     // do stuff with the user
     window.location.href = "index.html";
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
 function showRoute(object) {
   var directionsDisplay;
   var directionsService = new google.maps.DirectionsService();
   var map;
   directionsDisplay = new google.maps.DirectionsRenderer();
   var mapOptions = {
       zoom: 8,
       center: new google.maps.LatLng(0, -180)
   };
   map = new google.maps.Map(document.getElementById('trip-canvas'), mapOptions);
   directionsDisplay.setMap(map);

   start = new google.maps.LatLng(object.start.latitude, object.start.longitude);
   end = new google.maps.LatLng(object.end.latitude, object.end.longitude);


   var Location = Parse.Object.extend("Location");
   var query = new Parse.Query(Location);
   query.equalTo("tripID",object.get("tripID"));
   query.limit(100);
   var waypoints =
   [
     {
       location: new google.maps.LatLng(13.0178548,77.6652938),
       stopover: false
     }
   ];
   var waypts = [];
   query.find({
     success: function (results) {
       var count = results.length;
       var index = parseInt(count / 8 );
         for (var i = 0; i < 8; i++) {
           var pointer = (i*index + index) - 1 ;
             var latlong = results[pointer].get("location");
             waypts.push({
               location:new google.maps.LatLng(latlong.latitude,latlong.longitude),
               stopover:false});
           }
          var request = {
            origin: start,
            destination: end,
            waypoints:waypts,
            travelMode: google.maps.TravelMode.DRIVING
          };
          directionsService.route(request, function (response, status) {
            if (status == google.maps.DirectionsStatus.OK) {
              directionsDisplay.setDirections(response);
            }
          });
         }
     });
   }

 $(document).ready(function () {
     var selected = [];
     var object = [];
     var GameScore = Parse.Object.extend("Trip");
     var query = new Parse.Query(GameScore);
     var user = new Parse.User();
     query.include('user');
     query.descending("createdAt");
     query.find({
         success: function (results) {
             for (var i = 0; i < results.length; i++) {
                 var data = results[i];
                 var startTime = moment(data["createdAt"]).format('MMMM Do, h:mm:ss a');
                 var endTime = moment(data["updatedAt"]).format('MMMM Do, h:mm:ss a');
                 var user = [];
                 if ( data.get("endLocation") == undefined){
                     data["status"] = "In Progress";
                 } else {
                      data["status"] = "Completed";
                 }
                 data["start"] = data.get("startLocation");
                 data["end"] = data.get("endLocation");
                 data["user"] = data.get("user").get("username");
                 data["phone"] = data.get("updatedAt");

                 data["startTime"] = startTime;
                 data["endTime"] = endTime;
                 object.push(data);
             }
             $('#example').dataTable({
                 //"ajax": "data/objects.txt",
                  "aaSorting": [],
                 "data": object,
                 "columns": [
                     {
                         "data": "user"
             },
                     {
                         "data": "startTime"
             },
                     {
                         "data": "endTime"
             }, {
                         "data": "status"
             },
                     {
                         "mDataProp": null,
                         "bSearchable": false,
                         "bSortable": false,
                         "sDefaultContent": '<i class="fa fa-map-marker"></i>'
                     },

        ],
                 "rowCallback": function (row, data) {
                     if ($.inArray(data.DT_RowId, selected) !== -1) {
                         $(row).addClass('selected');
                     }
                 }
             });
             var table = $('#example').DataTable();

             $('#example tbody').on('click', 'tr', function () {

                 selectedIndex = table.row(this).index();
                 selectedData = table.rows(selectedIndex).data()
                 if ($(this).hasClass('selected')) {
                     $(this).removeClass('selected');
                 } else {
                     table.$('tr.selected').removeClass('selected');
                     $(this).addClass('selected');
                 }
                 showRoute(selectedData[0]);
             });

             $('#button').click(function () {
                 table.row('.selected').remove().draw(false);
             });


         },
         error: function (error) {
             alert("Error: " + error.code + " " + error.message);
         },
     });


 })
