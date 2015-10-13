 $(function () {});
 Parse.$ = jQuery;
 Parse.initialize("9jmo7iQvHaOETLW3a1bABEtverssotdOa85CFCBn", "XKTqDypOYCp4GojAzdW7TxHT6xMuVufCYaSgNLlH");
 var currentUser = Parse.User.current();

 if (!currentUser) {
     // do stuff with the user
     window.location.href = "index.html";
 }
 $(document).ready(function () {
   if(currentUser){
     var cookieUser
     var User = Parse.Object.extend("User");
     var query = new Parse.Query(User);
     query.equalTo("objectId",currentUser.id)
     query.find({
       success: function (user) {
         cookieUser = user[0];
         getDrivers(cookieUser);
       },
       error: function (error) {
         // The request failed
       }
     });
   }
 })

 function getDrivers(cookieUser){
   var object = [];
   var GameScore = Parse.Object.extend("User");
   var query = new Parse.Query(GameScore);
   query.equalTo("role","driver");
   var pointer = new Parse.Object("Customer");
   pointer.id = cookieUser.get("customer").id
   query.equalTo("customer",pointer);
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
           }, {
                       "mDataProp": null,
                       "bSearchable": false,
                       "bSortable": false,
                       "sDefaultContent": '<i class="fa fa-bar-chart"></i>'
                   },
      ]
           });
           addlistener();
       },
       error: function (error) {
           alert("Error: " + error.code + " " + error.message);
       }
   });

   function addlistener() {
       var table = $('#driverTable').DataTable();

       $('#driverTable tbody').on('click', 'tr', function () {

           selectedIndex = table.row(this).index();
           selectedData = table.rows(selectedIndex).data()
           if ($(this).hasClass('selected')) {
               $(this).removeClass('selected');
           } else {
               table.$('tr.selected').removeClass('selected');
               $(this).addClass('selected');
           }
           createCharts(selectedData[0]);
       });

       $('#button').click(function () {
           table.row('.selected').remove().draw(false);
       });

   }

   function createCharts(data) {
       if (data.username == "sweekar") {
           var trips = [2, 1, 0, 0, 1];
       }
       if (data.username == "jayanth") {
           var trips = [5, 3, 4, 7, 2];
       }
       if (data.username == "satyam") {
           var trips = [1, 0, 2, 1, 1];
       }
       $('#driverContainer').highcharts({
           chart: {
               type: 'column'
           },
           title: {
               text: 'No Of Trips This Week'
           },
           xAxis: {
               categories: ['01/06/2013', '02/06/2013', '03/06/2013', '04/06/2013', '05/06/2013']
           },
           yAxis: {
               min: 0,
               title: {
                   text: 'No Of Trips'
               },
               stackLabels: {
                   enabled: true,
                   style: {
                       fontWeight: 'bold',
                       color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                   }
               }
           },
           legend: {
               align: 'right',
               x: -30,
               verticalAlign: 'top',
               y: 25,
               floating: true,
               backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
               borderColor: '#CCC',
               borderWidth: 1,
               shadow: false
           },
           tooltip: {
               formatter: function () {
                   return '<b>' + this.x + '</b><br/>' +
                       this.series.name + ': ' + this.y + '<br/>' +
                       'Total: ' + this.point.stackTotal;
               }
           },
           plotOptions: {
               column: {
                   stacking: 'normal',
                   dataLabels: {
                       enabled: true,
                       color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white',
                       style: {
                           textShadow: '0 0 3px black'
                       }
                   }
               }
           },
           series: [{
                   name: 'Successfull',
                   data: trips
      }
                              // {
                                   //                 name: 'Satyam',
                                   //                 data: [3, 4, 4, 2, 5]
                                   //        }
                                   ]
       });
   }
 }
