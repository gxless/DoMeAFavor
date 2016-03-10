(function () {
    "use strict";
    angular
        .module("DoMeAFavorApp")
        .controller("HomeController", HomeController);

    function HomeController($scope) {

        $scope.newPost = false;
        $scope.showNewPost = showNewPost;
        $scope.notShowNewPost = notShowNewPost;

        function showNewPost() {
            $scope.newPost = true;
        }

        function notShowNewPost() {
            $scope.newPost = false;
        }

    }

})();
