(function () {
    angular
        .module("DoMeAFavorApp")
        .controller("LoginController", LoginController);

    function LoginController($scope, $location, UserService) {

        $scope.usernameWarning = false;
        $scope.passwordWarning = false;
        $scope.usernameMessage = null;
        $scope.passwordMessage = null;
        $scope.checkUsername = checkUsername;
        $scope.checkPassword = checkPassword;
        $scope.login = login;

        function checkUsername(username) {
            if(username == undefined) {
                $scope.usernameWarning = true;
                $scope.usernameMessage = "please input username";
            } else {
                $scope.usernameWarning = false;
                $scope.usernameMessage = null;
            }
        }


        function checkPassword(password) {
            if(password == undefined) {
                $scope.passwordWarning = true;
                $scope.passwordMessage = "please input password";
            } else {
                $scope.passwordWarning = false;
                $scope.passwordMessage = null;
            }
        }


        function login(username, password) {
            if(username && password) {
                UserService.login(username, password)
                    .then(function (response) {
                        var user = response;
                        if(user) {
                            UserService.setCurrentUser(user);
                            $location.url("/" + user._id + "/favors");
                        } else {
                            $scope.usernameMessage = "login doesn't match";
                        }
                    });
            } else {
                checkUsername(username);
                checkPassword(password);
            }


        }
    }
})();