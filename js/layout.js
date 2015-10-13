$(function () {});
Parse.$ = jQuery;
Parse.initialize("9jmo7iQvHaOETLW3a1bABEtverssotdOa85CFCBn", "XKTqDypOYCp4GojAzdW7TxHT6xMuVufCYaSgNLlH");
var currentUser = Parse.User.current();
if (!currentUser) {
    window.location.href = "index.html";
}
$(document).ready(function () {
  if(currentUser){
    var User = Parse.Object.extend("User");
    var query = new Parse.Query(User);
    query.equalTo("objectId",currentUser.id)
    query.find({
      success: function (user) {
        cookieUser = user[0];
        setTodaysData();
      },
      error: function (error) {
        // The request failed
      }
    });
  }
    /*
    var user = new Parse.User();
    user.set("username", "demo");
    user.set("password", "demo");
    user.set("email", "demo@tromke.com");
// other fields can be set just like with Parse.Object
    user.set("phone", "415-392-0202");
    user.signUp(null, {
        success: function(user) {
            // Hooray! Let them use the app now.
        },
        error: function(user, error) {
            // Show the error message somewhere and let the user try again.
            alert("Error: " + error.code + " " + error.message);
        }
    });
    if (Parse.User.current()) {
        alert("logged in");
    } else {
    }
    $('.form-signin').on('submit', function(e) {
        // Prevent Default Submit Event
        e.preventDefault();
        // Get data from the form and put them into variables
        var data = $(this).serializeArray(),
            username = data[0].value,
            password = data[1].value;

        // Call Parse Login function with those variables
        Parse.User.logIn(username, password, {
            // If the username and password matches
            success: function(user) {
                alert('Welcome!');
            },
            // If there is an error
            error: function(user, error) {
                console.log(error);
                alert("error");
            }
        });

    });

    */
    plotUsers();
})

function plotUsers() {
    $("h1.page-header").html("Latest postion of all cabs")
    var bounds = new google.maps.LatLngBounds();
    var mapOptions = {
        zoom: 18
    }
    var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
    var GameScore = Parse.Object.extend("Location");
    var query = new Parse.Query(GameScore);
    // query.equalTo("latest", true);
    query.descending("createdAt");
    query.limit(1); // limit to at most 3 results
    query.find({
        success: function (results) {
            // Do something with the returned Parse.Object values
            for (var i = 0; i < results.length; i++) {
                var name;
                var object = results[i];

                var myLatlng = new google.maps.LatLng(object.get("location").latitude, object.get("location").longitude);
                var marker = new google.maps.Marker({
                    position: myLatlng,
                    map: map,
                    title: name,
                    icon: {
                      path: fontawesome.markers.CAR,
                      scale: 0.5,
                      strokeWeight: 1,
                      strokeColor: 'black',
                      strokeOpacity: 1,
                      fillColor: '#FF0000',
                      fillOpacity: 0.7,
                    },
                });
                if (i == 0) {
                    map.setCenter(myLatlng);
                }
            }
        },
        error: function (error) {
            alert("Error: " + error.code + " " + error.message);
        }
    });
}



function setTodaysData() {
  var User = Parse.Object.extend("User");
  var query = new Parse.Query(User);
  query.equalTo("role","driver")
  var pointer = new Parse.Object("Customer");
  pointer.id = cookieUser.get("customer").id
  query.equalTo("customer",pointer)
  var driversToday = $('#driversToday');
  query.count({
    success: function (count) {
      // The count request succeeded. Show the count
      driversToday.html(count);
    },
    error: function (error) {
      // The request failed
    }
  });
  var Trip = Parse.Object.extend("Trip");
  var query = new Parse.Query(Trip);
  //    var d = new Date();
  //    var todaysDate = new Date(d.getDate() - 1);
  //    query.lessThanOrEqualTo("createdAt", todaysDate);
  var d = new Date();
  d.setDate(d.getDate() - 1);
  query.greaterThanOrEqualTo("createdAt", d);
  var totalTrips = $('#totalTrips');
  query.count({
    success: function (count) {
      // The count request succeeded. Show the count
      totalTrips.html(count);
    },
    error: function (error) {
      // The request failed
    }
  });
  var driversInTrip = $('#driversInTrip');
  query.doesNotExist("endLocation");
  query.count({
    success: function (count) {
      // The count request succeeded. Show the count
      driversInTrip.html(0);
    },
    error: function (error) {
      // The request failed
    }
  });
}
