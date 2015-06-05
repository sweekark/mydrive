// For any third party dependencies, like jQuery, place them in the lib folder.

// Configure loading modules from the lib directory,
// except for 'app' ones, which are in a sibling
// directory.
requirejs.config({
    baseUrl: 'js',
    paths: {
        app: 'app',
        "parse": "http://www.parsecdn.com/js/parse-1.2.19.min",
        "jquery": "https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min",
        "bootstrap": "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/js/bootstrap.min",

    }
});

// Start loading the main app file. Put all of
// your application logic in there.
requirejs(['jquery', 'bootstrap', 'parse', 'login']);