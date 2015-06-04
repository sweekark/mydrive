$(function() {
    Parse.$ = jQuery;
    // Replace this line with the one on your Quickstart Guide Page
    Parse.initialize("9jmo7iQvHaOETLW3a1bABEtverssotdOa85CFCBn", "XKTqDypOYCp4GojAzdW7TxHT6xMuVufCYaSgNLlH");
    //    $('#datetimepicker1').datetimepicker();
    //    $( "#datepicker" ).datepicker();
    
    Parse.Cloud.run('hello');
    
    
    var GameScore = Parse.Object.extend("Location");
    var query = new Parse.Query(GameScore);
    // query.equalTo("userID", userid);
    var d = new Date();
    

    var start = new moment(d);
    start.startOf('day');
    query.greaterThanOrEqualTo('createdAt', start.toDate());
    query.descending("createdAt");
    var finish = new moment(start);
    finish.add(1, 'day');
// till the start of tomorrow (non-inclusive)
    query.lessThan('createdAt', finish.toDate());
    // query.greaterThanorEqualTo("createdAt",date.getDate());
    query.limit(9000); // limit to at most 3 results
    query.find({
        success: function(results) {
            // Do something with the returned Parse.Object values

            for (var i = 0; i < results.length; i++) {
            }
        }
    });
});


