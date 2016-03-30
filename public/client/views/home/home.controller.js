(function () {
    "use strict";
    angular
        .module("DoMeAFavorApp")
        .controller("HomeController", HomeController);

    function HomeController($scope, $routeParams, FavorService, UserService, MapService) {

        var currentUser = UserService.getCurrentUser();
        $scope.viewedUserId = $routeParams.userId;

        UserService.getUserById($scope.viewedUserId)
            .then(function (response) {
                $scope.viewedUser = response;
            });


        $scope.isFriend = true;

        //initialize to display favors based on users' identities
        if(currentUser) {
            //if user logs in
            var userId = currentUser._id;
            //whether view user is logged in user
            if(userId == $scope.viewedUserId) {
                $scope.isCoordinator = !currentUser.volunteer;
            } else {
                $scope.isCoordinator = false;
                UserService.isFriend(userId, $scope.viewedUserId)
                    .then(function (response) {
                        if(!response) {
                            $scope.isFriend = false;
                        }
                    });
            }
        } else {
            //if no user logs in
            $scope.isCoordinator = false;
        }

        //display all favors based on userId
        FavorService.getFavorsByUserId($scope.viewedUserId)
            .then(function (response) {
                $scope.favors = response;
            });

        //add new favor by coordinator
        $scope.newPost = false;
        $scope.showNewPost = showNewPost;
        $scope.createFavor = createFavor;
        $scope.getLiteralDate = getLiteralDate;
        $scope.addFriend = addFriend;


        function showNewPost() {
            $scope.newPost = !$scope.newPost;
            $scope.newFavor = null;
        }

        function createFavor(newFavor) {
            if(newFavor) {
                if(newFavor.title && newFavor.content && newFavor.tagId && newFavor.address) {
                    MapService.getPosition(newFavor.address)
                        .then(function (response) {
                            var favor = {
                                title: newFavor.title,
                                content: newFavor.content,
                                tagId: newFavor.tagId,
                                coordinatorId: userId,
                                coordinator: currentUser.username,
                                date: new Date().toString(),
                                position: response
                            };
                            FavorService.createFavor(favor)
                                .then(function (response) {
                                    $scope.favors.unshift(response);
                                    $scope.newPost = false;
                                });
                        });
                }
            }

        }


        function getLiteralDate(dateString) {
            var date = new Date(dateString);
            var dateOri = date.toDateString();
            var dateLiteral = dateOri.substring(4, 7) + ". " + date.getDate() + ", " + date.getFullYear();
            return dateLiteral;
        }

        function addFriend(friendId) {
            UserService.addFriend(userId, friendId)
                .then(function (response) {
                    if(response) {
                        console.log(response);
                        $scope.isFriend = true;
                    }
                });
        }


    }

})();
