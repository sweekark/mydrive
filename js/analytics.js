 $(function () {});
 Parse.$ = jQuery;
 Parse.initialize("9jmo7iQvHaOETLW3a1bABEtverssotdOa85CFCBn", "XKTqDypOYCp4GojAzdW7TxHT6xMuVufCYaSgNLlH");
 var currentUser = Parse.User.current();
 if (currentUser) {} else {
     // show the signup or login page
     //Parse.User.logOut();
 }
 $(document).ready(function () {
     $(function () {
         $('#container').highcharts({
             chart: {
                 type: 'column'
             },
             title: {
                 text: 'No Of Drives This Week'
             },
             xAxis: {
                 categories: ['01/06/2013', '02/06/2013', '03/06/2013', '04/06/2013', '05/06/2013']
             },
             yAxis: {
                 min: 0,
                 title: {
                     text: 'Total fruit consumption'
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
                 name: 'Sweekar',
                 data: [5, 3, 4, 7, 2]
        }, {
                 name: 'Jayanth',
                 data: [2, 2, 3, 2, 1]
        }, {
                 name: 'Satyam',
                 data: [3, 4, 4, 2, 5]
        }]
         });



         $('#distanceContainer').highcharts({
             title: {
                 text: 'Total Distance Travelled This Week',
                 x: -20 //center
             },

             xAxis: {
                 //                 categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                 //                'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
                 categories: ['01/06/2013', '02/06/2013', '03/06/2013', '04/06/2013', '05/06/2013']
             },
             yAxis: {
                 title: {
                     text: 'Distance (kms)'
                 },
                 plotLines: [{
                     value: 0,
                     width: 1,
                     color: '#808080'
            }]
             },
             tooltip: {
                 valueSuffix: 'kms'
             },
             legend: {
                 layout: 'vertical',
                 align: 'right',
                 verticalAlign: 'middle',
                 borderWidth: 0
             },
             series: [{
                 name: 'Distance',
                 data: [7.0, 6.9, 9.5, 14.5, 11.5]
        }]
         });


     });
 })