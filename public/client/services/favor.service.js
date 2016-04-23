(function () {
    "use strict";
    angular
        .module("DoMeAFavorApp")
        .factory("FavorService", FavorService);


    function FavorService($q, $http) {

        var api = {
            getFavorsByUserId: getFavorsByUserId,
            getFavorsByTagId: getFavorsByTagId,
            createFavor: createFavor,
            getFavorById: getFavorById,

            joinFavor: joinFavor,
            hasRequest: hasRequest,
            agreeJoin: agreeJoin,
            rejectJoin: rejectJoin,
            disJoin: disJoin,

            deleteFavorById: deleteFavor
        };

        return api;

        function getFavorsByUserId(userId) {
            var deferred = $q.defer();
            $http.get("/api/favorService/user/" + userId + "/favor")
                .success(function (response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function getFavorsByTagId(tagId) {
            var deferred = $q.defer();
            $http.get("/api/favorService/tag/" + tagId + "/favor")
                .success(function (response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function getFavorById(favorId) {
            var deferred = $q.defer();
            $http.get("/api/favorService/favor/" + favorId)
                .success(function (response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function createFavor(favor) {
            var deferred = $q.defer();
            $http.post("/api/favorService/favor", favor)
                .success(function (response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }


        function joinFavor(favorId, userId, username) {
            var deferred = $q.defer();
            var newJoin = {
                "userId": userId,
                "username": username
            };
            $http.post("/api/favorService/favor/" + favorId + "/user/" + userId, newJoin)
                .success(function (response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function agreeJoin(favorId, userId) {
            var deferred = $q.defer();
            $http.put("/api/favorService/favor/" + favorId + "/user/" + userId)
                .success(function (response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function rejectJoin(favorId, userId) {
            var deferred = $q.defer();
            $http.delete("/api/favorService/favor/" + favorId + "/user/" + userId)
                .success(function (response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function disJoin(favorId, userId) {
            var deferred = $q.defer();
            $http.delete("/api/favorService/favor/" + favorId + "/user/" + userId + "/disjoin")
                .success(function (response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function hasRequest(userId, favorId) {
            var deferred = $q.defer();
            $http.get("/api/favorService/favor/" + favorId + "/volunteer/" + userId + "/requested")
                .success(function (response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }


        //old
        function deleteFavor(favorId) {
            for(var i in favors) {
                if(favors[i]._id == favorId) {
                    favors.splice(i, 1);
                    break;
                }
            }
        }



    }

})();