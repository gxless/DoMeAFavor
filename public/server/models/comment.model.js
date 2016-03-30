module.exports = function () {

    var uuid = require("node-uuid");
    var comments = require("./comment.mock.json");
    var userModel = require("./user.model.js");

    var api = {
        getCommentByIds: getCommentByIds,
        createComment: createComment,
        createReplyById: createReplyById,
        deleteCommentByIds: deleteCommentByIds
    };

    return api;

    function createReplyById(commentId, newReply) {
        for(var i in comments) {
            if(comments[i]._id == commentId) {
                comments[i].replies.push(newReply);
                var reply = JSON.parse(JSON.stringify(newReply));
                var replier = userModel().getUsernameById(reply.replierId);
                var host = userModel().getUsernameById(reply.hostId);
                reply.replier = replier;
                reply.host = host;
                return reply;
            }
        }
        return null;
    }

    function getCommentByIds(favorId, hostId) {
        var getComments = [];
        for(var i in comments) {
            if(comments[i].favorId == favorId && comments[i].hostId == hostId) {
                //add commenter name
                var getComment = JSON.parse(JSON.stringify(comments[i]));
                var username = userModel().getUsernameById(comments[i].commenterId);
                getComment.commenter =username;

                for(var j in getComment.replies) {
                    var replier = userModel().getUsernameById(getComment.replies[j].replierId);
                    var host = userModel().getUsernameById(getComment.replies[j].hostId);
                    getComment.replies[j].replier = replier;
                    getComment.replies[j].host = host;
                }
                getComments.push(getComment);
            }
        }
        return getComments.reverse();
    }

    function createComment(newComment) {
        newComment._id = uuid.v1();
        comments.push(newComment);
        var getComment = JSON.parse(JSON.stringify(newComment));
        var username = userModel().getUsernameById(newComment.commenterId);
        getComment.commenter = username;
        return getComment;
    }

    function deleteCommentByIds(favorId, userId) {
        for(var i in comments) {
            if(comments[i].favorId == favorId && comments[i].hostId == userId) {
                comments.splice(i, 1);
            }
        }
    }

};