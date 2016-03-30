(function () {
    "use strict";
    angular
        .module("DoMeAFavorApp")
        .factory("CommentService", CommentService);

    function CommentService($q, $http) {
        var api = {
            getCommentByIds: getCommentByIds,
            createComment: createComment,
            createReplyById: createReplyById
        };

        return api;

        function createReplyById(commentId, newReply) {
            var deferred = $q.defer();
            $http.post("/api/commentService/comment/" + commentId + "/reply", newReply)
                .success(function (response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function getCommentByIds(favorId, hostId) {
            var deferred = $q.defer();
            $http.get("/api/commentService/favor/" + favorId + "/host/" + hostId)
                .success(function (response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function createComment(newComment) {
            var deferred = $q.defer();
            $http.post("/api/commentService/comment/", newComment)
                .success(function (response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }


    }

})();