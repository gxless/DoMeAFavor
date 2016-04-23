(function () {
    "use strict";
    angular
        .module("DoMeAFavorApp")
        .factory("UserService", UserService);


    function UserService($rootScope, $q, $http) {
        var api = {
            updateUserById: updateUserById,
            createUser: createUser,

            login: login,
            getUserById: getUserById,
            hasUsername: hasUsername,
            hasEmail: hasEmail,

            getFriendsById: getFriendsById,
            addFriend: addFriend,
            isFriend: isFriend,
            unFriend: unFriend,

            setCurrentUser: setCurrentUser,
            getCurrentUser: getCurrentUser
        };

        return api;

        function hasEmail(email) {
            var deferred = $q.defer();
            $http.get("/api/userService/user/email/" + email)
                .success(function (response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function hasUsername(username) {
            var deferred = $q.defer();
            $http.get("/api/userService/user/id/" + username)
                .success(function (response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function getUserById(userId) {
            var deferred = $q.defer();
            $http.get("/api/userService/user/" + userId)
                .success(function (response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function updateUserById(userId, user) {
            var deferred = $q.defer();
            $http.put("/api/userService/user/" + userId, user)
                .success(function (response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function login(username, password) {
            var deferred = $q.defer();
            var credentials = {"username": username, "password":password};
            $http.post("/api/userService/login", credentials)
                .success(function (response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function createUser(user) {
            var deferred = $q.defer();
            $http.post("/api/userService/user", user)
                .success(function (response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function setCurrentUser(user) {
            $rootScope.currentUser = user;
        }

        function getCurrentUser() {
            return $rootScope.currentUser;
        }


        //friends functions
        function getFriendsById(userId) {
            var deferred = $q.defer();
            $http.get("/api/userService/user/" + userId + "/friend")
                .success(function (response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function addFriend(userId, username, friendId, friendUsername) {
            var deferred = $q.defer();
            var friendPair = {userId: userId, username: username, friendId: friendId, friendUsername: friendUsername};
            $http.post("/api/userService/user/" + userId + "/friend/" + friendId, friendPair)
                .success(function (response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function unFriend(userId, friendId) {
            var deferred = $q.defer();
            $http.delete("/api/userService/user/" + userId + "/friend/" + friendId)
                .success(function (response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function isFriend(userId, friendId) {
            var deferred = $q.defer();
            $http.get("/api/userService/user/" + userId + "/friendId/" + friendId)
                .success(function (response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

    }

})();