(function () {
    angular
        .module("DoMeAFavorApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($scope, $location, UserService) {

        $scope.usernameOk = false;
        $scope.usernameWarning = false;
        $scope.usernameMessage = null;
        $scope.usernameInitOnBlur = false;

        $scope.emailOk = false;
        $scope.emailWarning = false;
        $scope.emailMessage = null;
        $scope.emailInitOnBlur = false;

        $scope.passwordOk = false;
        $scope.passwordWarning = false;
        $scope.passwordMessage = null;
        $scope.passwordInitOnBlur = false;

        $scope.passwordVOk = false;
        $scope.passwordVWarning = false;
        $scope.passwordVMessage = null;
        $scope.passwordVInitOnBlur = false;

        $scope.checkUsername = checkUsername;
        $scope.blurUsername = blurUsername;
        $scope.checkEmail = checkEmail;
        $scope.blurEmail = blurEmail;
        $scope.checkPassword = checkPassword;
        $scope.blurPassword = blurPassword;
        $scope.checkPasswordV = checkPasswordV;
        $scope.blurPasswordV = blurPasswordV;
        $scope.register = register;


        //user registration
        function register(username, password, passwordV, email) {
            if($scope.registrationForm.$valid && $scope.usernameOk &&
                $scope.emailOk && checkPasswordV(password, passwordV)) {
                UserService.createUser($scope.user)
                    .then(function (response) {
                        UserService.setCurrentUser(response);
                        $location.url("/" + response._id + "/favors");
                    });

            } else {
                checkUsername(username);
                checkEmail(email);
                checkPassword(password);
                checkPasswordV(password, passwordV);
            }

        }


        //verify username
        function blurUsername(username) {
            $scope.usernameInitOnBlur = true;
            checkUsername(username);
        }

        function checkUsername(username) {
            if(username === undefined) {
                $scope.usernameOk = false;
                $scope.usernameWarning = true;
                $scope.usernameMessage = "username cannot be empty";
            } else if($scope.usernameInitOnBlur) {
                UserService.hasUsername(username)
                    .then(function (response) {
                        if(response) {
                            $scope.usernameOk = false;
                            $scope.usernameWarning = true;
                            $scope.usernameMessage = "username is taken";
                        } else {
                            $scope.usernameWarning = false;
                            $scope.usernameOk = true;
                            $scope.usernameMessage = null;
                        }
                    });
            }
        }


        //verify email
        function blurEmail(email) {
            $scope.emailInitOnBlur = true;
            checkEmail(email);
        }

        function checkEmail(email) {
            //check if email is valid
            if(email === undefined) {
                $scope.emailOk = false;
                $scope.emailWarning = true;
                $scope.emailMessage = "email is invalid";
            } else if($scope.emailInitOnBlur) {
                UserService.hasEmail(email)
                    .then(function (response) {
                        if(response) {
                            $scope.emailOk = false;
                            $scope.emailWarning = true;
                            $scope.emailMessage = "email is taken";
                        } else {
                            $scope.emailOk = true;
                            $scope.emailWarning = false;
                            $scope.emailMessage = null;
                        }
                });

            }
        }


        //input password
        function blurPassword(password) {
            $scope.passwordInitOnBlur = true;
            checkPassword(password);
        }

        function checkPassword(password) {
            if(password === undefined) {
                $scope.passwordOk = false;
                $scope.passwordWarning = true;
                $scope.passwordMessage = "password cannot be empty";
            } else if($scope.passwordInitOnBlur){
                $scope.passwordOk = true;
                $scope.passwordWarning = false;
                $scope.passwordMessage = null;

                //if verified password has been changed
                if($scope.passwordVInitOnBlur) {
                    checkPasswordV(password, $scope.passwordV);
                }
            }
        }


        //verify password
        function blurPasswordV(password, passwordV) {
            $scope.passwordVInitOnBlur = true;
            checkPasswordV(password, passwordV);
        }

        function checkPasswordV(password, passwordV) {
            if(passwordV == undefined) {
                $scope.passwordVOk = false;
                $scope.passwordVWarning = true;
                $scope.passwordVMessage = "verified password cannot be empty";
                return false;
            } else if(password != passwordV) {
                $scope.passwordVOk = false;
                $scope.passwordVWarning = true;
                $scope.passwordVMessage = "password doesn't match";
                return false;
            } else if(password == passwordV) {
                $scope.passwordVOk = true;
                $scope.passwordVWarning = false;
                $scope.passwordVMessage = null;
                return true;
            }
            return false;

        }

    }

})();