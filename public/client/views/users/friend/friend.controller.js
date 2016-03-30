(function () {
    angular
        .module("DoMeAFavorApp")
        .controller("FriendController", FriendController);

    function FriendController($scope, $routeParams, UserService) {

        var currentUser = UserService.getCurrentUser();

        $scope.hasFriend = false;
        $scope.hasAccess = false;
        $scope.unFriend = unFriend;

        //initialize to display favors based on users' identities
        if(currentUser) {
            //if user logs in
            if(currentUser._id == $routeParams.userId) {
                $scope.hasAccess = true;
            }
        }

        UserService.getFriendsById($routeParams.userId)
            .then(function (response) {
                $scope.friends = response;
                if($scope.friends.length == 0) {
                    $scope.hasFriend = true;
                }
            });


        function unFriend(friend, index) {
            UserService.unFriend(currentUser._id, friend.friendId)
                .then(function (response) {
                    if(response) {
                        $scope.friends.splice(index, 1);
                        if($scope.friends.length == 0) {
                            $scope.hasFriend = true;
                        }
                    }
                });
        }


    }


})();