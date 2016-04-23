(function () {
    angular
        .module("DoMeAFavorApp")
        .controller("MapController", MapController);

    function MapController($scope, FavorService, MapService) {

        var initCenter = {lat: 42.348, lng: -71.064};
        $scope.setPlace = setPlace;

        init(initCenter);

        function makeInfoWindowEvent(map, infoWindow, marker) {
            return function() {
                infoWindow.open(map, marker);
            };
        }

        function setPlace(address) {
            if(address) {
                MapService.getPosition(address)
                    .then(function (response) {
                        init(response);
                    });
            }
        }

        function init(center) {
            var initCenter = center;
            var initMap = {center: initCenter, zoom: 13};
            var map = new google.maps.Map(document.getElementById("googleMap"), initMap);

            FavorService.getFavorsByTagId(0)
                .then(function (response) {
                    var favors = response;

                    //display markers after retrieving positions
                    var markers = [];
                    var infoWindows = [];

                    for(var i in favors) {
                        markers[i] = new google.maps.Marker({
                            map: map,
                            position: favors[i].position
                        });

                        var link = "#/"+favors[i].coordinatorId+"/favors/"+favors[i]._id;
                        var title = favors[i].title;
                        infoWindows[i] = new google.maps.InfoWindow({
                            content: "<a href=" + link + ">"+title+"</a>"
                        });

                        google.maps.event.addListener(markers[i], "click",
                            makeInfoWindowEvent(map, infoWindows[i], markers[i]));
                    }


                });
        }



    }

})();