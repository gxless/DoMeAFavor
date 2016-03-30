module.exports = function (app) {

    var commentModel = require("./../models/comment.model.js")();

    app.get("/api/commentService/favor/:favorId/host/:hostId", getCommentByIds);
    app.post("/api/commentService/comment/:commentId/reply", createReplyById);
    app.post("/api/commentService/comment", createComment);


    function getCommentByIds(req, res) {
        var favorId = req.params.favorId;
        var hostId = req.params.hostId;
        var comments = commentModel.getCommentByIds(favorId, hostId);
        res.json(comments);
    }

    function createComment(req, res) {
        var newComment = commentModel.createComment(req.body);
        res.json(newComment);
    }

    function createReplyById(req, res) {
        var commentId = req.params.commentId;
        var newReply = commentModel.createReplyById(commentId, req.body);
        res.json(newReply);
    }


};