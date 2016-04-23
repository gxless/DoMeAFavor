(function () {
    "use strict";
    angular
        .module("DoMeAFavorApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($scope, $routeParams, $http, UserService) {

        var currentUser = UserService.getCurrentUser();
        $scope.userId = currentUser._id;
        $scope.hasAccess = false;

        //initialize to display favors based on users' identities
        if(currentUser) {
            //if user logs in
            if(currentUser._id == $routeParams.userId) {
                $scope.hasAccess = true;
            }
        }

        UserService.getUserById($routeParams.userId)
            .then(function (response) {
                $scope.currentUser = angular.copy(response);
            });


        $scope.emailWarning = false;
        $scope.emailMessage = null;
        $scope.updateMessage = null;
        $scope.checkEmail = checkEmail;
        $scope.updateProfile = updateProfile;

        function checkEmail(email) {
            if(email == undefined) {
                $scope.emailWarning = true;
                $scope.emailMessage = "email address is invalid";
            } else {
                $scope.emailWarning = false;
                $scope.emailMessage = null;
            }
        }

        function updateProfile(user) {
            if(user.email) {
                if($scope.password) {
                    user.password = $scope.password;
                    user.changePass = true;
                }
                UserService.updateUserById(user._id, user)
                    .then(function (response) {
                        UserService.setCurrentUser(response);
                        $scope.updateMessage = "Update Successfully";
                    });

            } else {
                $scope.updateMessage = null;
            }
        }


    }
})();