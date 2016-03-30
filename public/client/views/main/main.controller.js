(function () {
    "use strict";
    angular
        .module("DoMeAFavorApp")
        .controller("MainController", MainController);

    function MainController($scope, $location, UserService) {
        $scope.$location = $location;
        UserService.setCurrentUser(null);
    }
})();