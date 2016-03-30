(function () {
    "use strict";
    angular
        .module("DoMeAFavorApp")
        .controller("CommunityController", CommunityController);

    function CommunityController($scope, FavorService) {

        $scope.showFavors = showFavors;
        $scope.getLiteralDate = getLiteralDate;

        $scope.categoryChosen = 0;
        FavorService.getFavorsByTagId(0)
            .then(function (response) {
                $scope.favors = response;
            });

        function showFavors(tagId) {
            FavorService.getFavorsByTagId(tagId)
                .then(function (response) {
                    $scope.favors = response;
                    $scope.categoryChosen = tagId;

                });
        }

        function getLiteralDate(dateString) {
            var date = new Date(dateString);
            var dateOri = date.toDateString();
            var dateLiteral = dateOri.substring(4, 7) + ". " + date.getDate() + ", " + date.getFullYear();
            return dateLiteral;
        }
    }


})();