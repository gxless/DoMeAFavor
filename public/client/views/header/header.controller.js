(function () {
    angular
        .module("DoMeAFavorApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($scope, $rootScope, $location, $http, UserService) {
        $scope.logout = logout;
        $scope.homeActive = homeActive;
        $scope.profileActive = profileActive;
        $scope.friendsActive = friendsActive;
        $scope.collapseNav = collapseNav;


        function logout() {
            $http.post("/api/userService/logout")
                .success(function()
                {
                    UserService.setCurrentUser(null);
                    angular.element(".navbar-collapse").collapse("hide");
                    $location.url("/");
                });
        }

        function homeActive(currentUrl) {
            if($rootScope.currentUser) {
                var targetUrl = "/" + $rootScope.currentUser._id + "/favors";
                if(targetUrl == currentUrl) {
                    return true;
                }
            }
            return false;
        }

        function profileActive(currentUrl) {
            if($rootScope.currentUser) {
                var targetUrl = "/" + $rootScope.currentUser._id + "/profile";
                if(targetUrl == currentUrl) {
                    return true;
                }
            }
            return false;
        }

        function friendsActive(currentUrl) {
            if($rootScope.currentUser) {
                var targetUrl = "/" + $rootScope.currentUser._id + "/friends";
                if(targetUrl == currentUrl) {
                    return true;
                }
            }
            return false;
        }

        function collapseNav() {
            angular.element(".navbar-collapse").collapse("hide");
        }

    }

})();