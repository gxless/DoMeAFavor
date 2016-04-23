(function () {
    "use strict";
    angular
        .module("DoMeAFavorApp")
        .controller("HomeController", HomeController);

    function HomeController($scope, $routeParams, FavorService, UserService, MapService) {

        var currentUser = UserService.getCurrentUser();
        $scope.viewedUserId = $routeParams.userId;
        $scope.isFriend = true;

        UserService.getUserById($scope.viewedUserId)
            .then(function (response) {
                $scope.viewedUser = response;
            });


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
                $scope.favors = response.reverse();
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
                if(newFavor.title && newFavor.content && newFavor.tagId) {
                    var favor = {
                        title: newFavor.title,
                        tagId: newFavor.tagId,
                        date: new Date().toString(),
                        coordinatorId: userId,
                        coordinator: currentUser.username,
                        joinedUsers: [{userId: userId, username: currentUser.username, joined: true}],
                        content: newFavor.content
                    };
                    if(newFavor.address) {
                        MapService.getPosition(newFavor.address)
                            .then(function (response) {
                                favor.position = response;
                                FavorService.createFavor(favor)
                                    .then(function (response) {
                                        $scope.favors.unshift(response);
                                        $scope.newPost = false;
                                    });

                            });
                    } else {
                        FavorService.createFavor(favor)
                            .then(function (response) {
                                $scope.favors.unshift(response);
                                $scope.newPost = false;
                            });
                    }

                }
            }

        }

        function addFriend(friendId, friendUsername) {
            UserService.addFriend(userId, currentUser.username, friendId, friendUsername)
                .then(function (response) {
                    if(response) {
                        $scope.isFriend = true;
                    }
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
