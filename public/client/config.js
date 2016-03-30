(function () {
    "use strict";
    angular
        .module("DoMeAFavorApp")
        .config(function ($routeProvider) {
            $routeProvider
                .when("/", {
                    templateUrl: "views/community/community.view.html",
                    controller: "CommunityController"
                })
                .when("/:userId/favors", {
                    templateUrl: "views/home/home.view.html",
                    controller: "HomeController"
                })
                .when("/:userId/favors/:favorId", {
                    templateUrl: "views/home/favor.view.html",
                    controller: "FavorController"
                })
                .when("/:userId/profile", {
                    templateUrl: "views/users/profile/profile.view.html",
                    controller: "ProfileController"
                })
                .when("/:userId/friends", {
                    templateUrl: "views/users/friend/friend.view.html",
                    controller: "FriendController"
                })
                .when("/:userId/mail", {
                    templateUrl: "views/users/mail/mail.view.html"
                })
                .when("/login", {
                    templateUrl: "views/users/login/login.view.html",
                    controller: "LoginController"
                })
                .when("/register", {
                    templateUrl: "views/users/register/register.view.html",
                    controller: "RegisterController"
                })
                .when("/map", {
                    templateUrl: "views/map/map.view.html",
                    controller: "MapController"
                })
                .otherwise({
                    redirectTo: "/"
                });
        });
})();