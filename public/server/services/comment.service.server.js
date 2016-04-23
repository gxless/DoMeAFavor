module.exports = function (app, CommentModel) {

    app.get("/api/commentService/favor/:favorId/host/:hostId", getCommentByIds);
    app.post("/api/commentService/comment/:commentId/reply", createReplyById);
    app.post("/api/commentService/comment", createComment);


    function getCommentByIds(req, res) {
        CommentModel.getCommentByIds(req.params.favorId, req.params.hostId)
            .then(function (response) {
               res.json(response);
            });
    }

    function createComment(req, res) {
        CommentModel.createComment(req.body)
            .then(function (response) {
                res.json(response);
            });
    }

    function createReplyById(req, res) {
        CommentModel.createReplyById(req.params.commentId, req.body)
            .then(function (response) {
                res.json(response);
            });
    }


};