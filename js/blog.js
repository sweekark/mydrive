$(function() {

    Parse.$ = jQuery;
    // Replace this line with the one on your Quickstart Guide Page
    Parse.initialize("c8mJcK3VimGPIE21sfHMwdhQPF0a8lnnstYdEatL", "XezbsLvicf7ANuVpBUdUACqTGVl3ty5j0bBctKW4");
    var TestObject = Parse.Object.extend("TestObject");
    var testObject = new TestObject();
    testObject.save({foo: "bar"}).then(function(object) {
        //alert("yay! it worked");
    });
    //
    
            $(function(){ $("head").load("header.html") });
            $("#header").load("header.html");
            $("#footer").load("footer.html");

    $("#submit").submit(function() {
        alert("in submit");

        // do the extra stuff here
        $.ajax({
            type: "POST",
            url: "mail.php",
            data: $(this).serialize(),
            success: function() {
                $('.simple-sucess').fadeIn(100).show();
                $('.contact_form').fadeOut(100).hide();
                $('.simple_error').fadeOut(100).hide();

            }
        })

    })


});


$(document).ready(function() {
    $("#target").submit(function() {
        // do the extra stuff here
        $.ajax({
            type: "POST",
            url: "mail.php",
            data: $(this).serialize(),
            success: function() {
                $('.simple-sucess').fadeIn(100).show();
                $('.contact_form').fadeOut(100).hide();
                $('.simple_error').fadeOut(100).hide();

            }
        })

    })
    var GameScore = Parse.Object.extend("TestObject");
    var query = new Parse.Query(GameScore);
    var mySelect = $('#size');
    query.find({
        success: function(results) {
            for (var i = 0; i < results.length; i++) {
                var object = results[i];
                value = object.get("foo");
                mySelect.append($('<option>').text(value).attr('value', i));
            }
        },
        error: function(error) {
            alert("Error: " + error.code + " " + error.message);
        }
    });
})