(function () {
    "use strict";
    angular
       .module("DoMeAFavorApp")
       .controller("FavorController", FavorController);

    function FavorController($scope) {

        $scope.newPost = false;
        $scope.edit = false;
        $scope.join = true;
        $scope.showNewPost = showNewPost;
        $scope.notShowNewPost = notShowNewPost;
        $scope.showEdit = showEdit;
        $scope.notShowEdit = notShowEdit;
        $scope.disjoin = disjoin;

        function showNewPost() {
            var today = new Date();
            var dateOri = today.toDateString();
            var date = dateOri.substring(4, 8) + today.getDay() + "," + dateOri.substring(10);

            $scope.newPost = true;
            $scope.newPostDate = date;
        }

        function notShowNewPost() {
            $scope.newPost = false;
        }


        function showEdit() {
            $scope.edit = true;
        }

        function notShowEdit() {
            $scope.edit = false;
        }

        function disjoin() {
            $scope.join = false;
        }

        var title = "Feb 1, 2016";
        var content = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum " +
        "has been the industry's standard dummy text ever since the 1500s, when an unknown " +
        "printer took a galley of type and scrambled it to make a type specimen book. It has " +
        "survived not only five centuries, but also the leap into electronic typesetting, " +
        "remaining essentially unchanged. It was popularised in the 1960s with the release " +
        "of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop " +
        "publishing software like Aldus PageMaker including versions of Lorem Ipsum.";

        $scope.content1 = content;
        $scope.title1 = title;



    }

})();