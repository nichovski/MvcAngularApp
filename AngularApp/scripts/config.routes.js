"use strict";

app.config(function ($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', { templateUrl: "AngularApp/views/home.html", controller: "HomeController" })
        .when('/home', { templateUrl: "AngularApp/views/home.html", controller: "HomeController" });

    $locationProvider.html5Mode(true);
});
