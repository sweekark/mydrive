$(function () {
    Parse.$ = jQuery;
    // Replace this line with the one on your Quickstart Guide Page
    Parse.initialize("9jmo7iQvHaOETLW3a1bABEtverssotdOa85CFCBn", "XKTqDypOYCp4GojAzdW7TxHT6xMuVufCYaSgNLlH");
    //    $('#datetimepicker1').datetimepicker();
    //   $( "#datepicker" ).datepicker();

});

$(document).ready(function () {
    /*

    var user = new Parse.User();
    user.set("username", "satyam");
    user.set("password", "satyam");
    user.set("email", "satyam@tromke.com");

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


    var GameScore = Parse.Object.extend("User");
    var query = new Parse.Query(GameScore);
    var mySelect = $('#user');
    plotUsers();
    query.find({
        success: function (results) {
            for (var i = 0; i < results.length; i++) {
                var object = results[i];
                value = object.get("username");
                var userid = object.id;
                mySelect.append($('<option>').text(value).attr('value', userid));

            }
        },
        error: function (error) {
            alert("Error: " + error.code + " " + error.message);
        }
    });

    $("#submit-bt").click(function () {
        var userId = $('#user option:selected').attr('value');
        var user = $('#user option:selected').text();
        var locationType = $('input[name=optradio]:checked').val()
        var selectedDate = $("#datepicker").datepicker("getDate");
        if (locationType == "checkin") {
            plotCheckins(userId, user);
        }
        if (locationType == "allusers") {
            plotUsers();
        }
        if (locationType == "trace") {
            //plotPolyline(userId);
            plotDirection(userId, user);
        }

    })

})

function plotCheckins(userid, user) {
    $("h1.page-header").html("Checkins by " + user)
    var bounds = new google.maps.LatLngBounds();
    var mapOptions = {
        zoom: 10
    }
    var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
    //map.fitBounds(bounds);
    /*
    var results = getLocation(userid)
    //var results = data['results'];
    for (var i = 0; i < results.length; i++) {
                var object = results[i];
                var myLatlng = new          google.maps.LatLng(object.get("location").latitude,object.get("location").longitude);
                var marker = new google.maps.Marker({
                    position: myLatlng,
                    map: map,
                    title: 'Hello World!'
                });
                if(i == 0) {
                    map.setCenter(myLatlng);
                }
            }
    */
    var GameScore = Parse.Object.extend("Location");
    var query = new Parse.Query(GameScore);
    query.equalTo("checkIn", true);


    var user = new Parse.User();

    // Set your id to desired user object id

    user.id = userid;
    query.include('user');
    query.equalTo('user', user);
    query.descending("createdAt");
    query.limit(5); // limit to at most 3 results
    query.find({
        success: function (results) {
            // Do something with the returned Parse.Object values
            for (var i = 0; i < results.length; i++) {
                var object = results[i];

                var myLatlng = new google.maps.LatLng(object.get("location").latitude, object.get("location").longitude);
                var marker = new google.maps.Marker({
                    position: myLatlng,
                    map: map,
                    icon: "images/rsz_1rsz_map-marker-ball-left-chartreuse.png",
                    title: 'checked in @'
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

function plotUsers() {
    $("h1.page-header").html("Latest postion of all cabs")
    var bounds = new google.maps.LatLngBounds();
    var mapOptions = {
        zoom: 12
    }
    var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
    var GameScore = Parse.Object.extend("Location");
    var query = new Parse.Query(GameScore);
    query.equalTo("latest", true);
    query.descending("createdAt");
    query.limit(6); // limit to at most 3 results
    query.find({
        success: function (results) {
            // Do something with the returned Parse.Object values
            for (var i = 0; i < results.length; i++) {

                var name;
                if (i == 0) {
                    name = "Jayanth";
                }
                if (i == 1) {
                    name = "Satyam";
                }
                if (i == 2) {
                    name = "Josh";
                }
                if (i == 3) {
                    name = "Sandy";
                }
                if (i == 4) {
                    name = "Sweekar";
                }

                var object = results[i];

                var myLatlng = new google.maps.LatLng(object.get("location").latitude, object.get("location").longitude);
                var marker = new google.maps.Marker({
                    position: myLatlng,
                    map: map,
                    //icon: "images/rsz_1rsz_map-marker-ball-left-chartreuse.png",
                    title: name
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


function plotDirection(userid, user) {
    $("h1.page-header").html("Trace for " + user)
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
    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
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
                    drawMarker(object, map);
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

    //google.maps.event.addDomListener(window, 'load', initialize);

}

function plotPolyline(userid) {
    var bounds = new google.maps.LatLngBounds();
    var map = initiateMap();
    var flightPlanCoordinates = [];
    //map.fitBounds(bounds);
    var GameScore = Parse.Object.extend("Location");
    var query = new Parse.Query(GameScore);
    // query.equalTo("userID", userid);
    var date = new Date();
    query.descending("createdAt");
    // query.greaterThanorEqualTo("createdAt",date.getDate());
    query.limit(1000);
    query.find({
        success: function (results) {
            for (var i = 0; i < results.length; i++) {
                var object = results[i];
                if (object.get("checkIn") == true) {
                    drawMarker(object, map);
                } else {
                    if (i != 0) {
                        var distance = checkPointsNotSame(object, results[i - 1]);
                    }
                    if (distance > 10 || i == 0 || i == (results.length - 1)) {
                        polylineCordinates(object, flightPlanCoordinates, map, i, results);
                    }
                }
            }
            drawPolyline(flightPlanCoordinates, map);

        },
        error: function (error) {
            alert("Error: " + error.code + " " + error.message);
        }
    });

}


/*
this function creates flightPlanCoordinates based on the result set
*/

function polylineCordinates(object, flightPlanCoordinates, map, i, results) {
    var myLatlng = new google.maps.LatLng(object.get("location").latitude, object.get("location").longitude);
    flightPlanCoordinates.push(myLatlng);
    if (i == 0) {
        var startTime = 'Started @ ' + object.createdAt;
        map.setCenter(myLatlng);
        var marker = new google.maps.Marker({
            position: myLatlng,
            map: map,
            title: startTime
        });
    }
    var markerImage = new google.maps.MarkerImage("images/rsz_checkered-flag-icon.png",
        new google.maps.Size(50, 50),
        new google.maps.Point(0, 0),
        new google.maps.Point(30, 30));
    if (i == (results.length - 1)) {
        var stopTime = 'Stopped @ ' + object.createdAt;
        var marker = new google.maps.Marker({
            position: myLatlng,
            map: map,
            //icon:"images/rsz_checkered-flag-icon.png",
            //icon: markerImage,
            title: stopTime
        });
    }

}


/*
function to add markers in the map
map object should be supplied to the funciton.
*/

function drawMarker(object, map) {
    var myLatlng = new google.maps.LatLng(object.get("location").latitude, object.get("location").longitude);
    var checkinTime = 'checked in @ ' + object.createdAt;
    var marker = new google.maps.Marker({
        position: myLatlng,
        map: map,
        icon: "images/rsz_1rsz_map-marker-ball-left-chartreuse.png",
        title: checkinTime
    });
}

/*
function to draw polyline for the given map object and coordinates
*/
function drawPolyline(flightPlanCoordinates, map) {
    var lineSymbol = {
        path: 'M 0,-1 0,1',
        strokeOpacity: 2,
        scale: 4
    };
    var flightPath = new google.maps.Polyline({
        path: flightPlanCoordinates,
        geodesic: true,
        icons: [{
            icon: lineSymbol,
            offset: '0',
            //repeat: '20px'
        }],
        strokeWeight: 4
    });

    flightPath.setMap(map)
}

/* 
creates a map object
*/
function initiateMap() {
    var mapOptions = {
        zoom: 16,
        center: new google.maps.LatLng(0, -180)
    };
    var map = new google.maps.Map(document.getElementById('map-canvas'),
        mapOptions);
    return map;
}

function initiateMap2() {
    directionsDisplay = new google.maps.DirectionsRenderer();
    var chicago = new google.maps.LatLng(41.850033, -87.6500523);
    var mapOptions = {
        zoom: 7,
        center: chicago
    };
    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
    directionsDisplay.setMap(map);

    return map;
}

function checkPointsNotSame(object, object2) {
    var p1 = new google.maps.LatLng(object.get("location").latitude, object.get("location").longitude);
    var p2 = new google.maps.LatLng(object2.get("location").latitude, object2.get("location").longitude);
    return (google.maps.geometry.spherical.computeDistanceBetween(p1, p2)).toFixed(2);
}

function calcRoute() {
    var start = new google.maps.LatLng(12.937070, 77.626605);

    var end = new google.maps.LatLng(12.957026, 77.700714);
    var wayp = new google.maps.LatLng(12.957026, 77.700714);
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