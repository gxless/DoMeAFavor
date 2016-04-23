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
                    controller: "HomeController",
                    resolve: {loggedin: checkCurrentUser}
                })
                .when("/:userId/favors/:favorId", {
                    templateUrl: "views/home/favor.view.html",
                    controller: "FavorController",
                    resolve: {loggedin: checkCurrentUser}
                })
                .when("/:userId/profile", {
                    templateUrl: "views/users/profile/profile.view.html",
                    controller: "ProfileController",
                    resolve: {loggedin: checkLoggedin}
                })
                .when("/:userId/friends", {
                    templateUrl: "views/users/friend/friend.view.html",
                    controller: "FriendController",
                    resolve: {loggedin: checkCurrentUser}
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

    var checkLoggedin = function($q, $timeout, $http, $location, $rootScope)
    {
        var deferred = $q.defer();
        $http.get("/api/userService/loggedin").success(function(user)
        {
            // User is Authenticated
            if (user !== '0')
            {
                $rootScope.currentUser = user;
                deferred.resolve();
            }
            // User is Not Authenticated
            else
            {
                deferred.reject();
                $location.url('/login');
            }
        });
        return deferred.promise;
    };

    var checkCurrentUser = function($q, $timeout, $http, $location, $rootScope)
    {
        var deferred = $q.defer();
        $http.get("/api/userService/loggedin").success(function(user)
        {
            // User is Authenticated
            if (user !== '0')
            {
                $rootScope.currentUser = user;
            }
            deferred.resolve();
        });
        return deferred.promise;
    };

    var checkCoordinator = function($q, $timeout, $http, $location, $rootScope)
    {
        var deferred = $q.defer();
        $http.get('/api/userService/loggedin').success(function(user)
        {
            // User is Authenticated
            if (user !== '0' && user.volunteer == false)
            {
                $rootScope.currentUser = user;
                deferred.resolve();
            }
        });

        return deferred.promise;
    };
})();