(function () {
    "use strict";
    angular
        .module("DoMeAFavorApp")
        .factory("MapService", MapService);


    function MapService($q, $http) {

        var api = {
            getPosition: getPosition
        };

        return api;

        function getPosition(address) {
            var deferred = $q.defer();
            $http.get("http://maps.googleapis.com/maps/api/geocode/json?address=" + address)
                .success(function (response) {
                    deferred.resolve(response.results[0].geometry.location);
                });
            return deferred.promise;
        }


    }


})();