(function () {
    angular
        .module("DoMeAFavorApp")
        .controller("MapController", MapController);

    function MapController(FavorService) {

        var initCenter = {lat: 42.348, lng: -71.064};
        var initMap = {center: initCenter, zoom: 12};
        var map = new google.maps.Map(document.getElementById("googleMap"), initMap);

        function makeInfoWindowEvent(map, infoWindow, marker) {
            return function() {
                infoWindow.open(map, marker);
            };
        }

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

})();