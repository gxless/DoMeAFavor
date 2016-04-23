module.exports = function (mongoose, q) {

    var CommentSchema = require("./comment.schema.server.js")(mongoose);
    var CommentModel = mongoose.model("CommentModel", CommentSchema);

    var api = {
        getCommentByIds: getCommentByIds,
        createComment: createComment,
        createReplyById: createReplyById,
        deleteCommentByIds: deleteCommentByIds
    };

    return api;

    function getCommentByIds(favorId, hostId) {
        var deferred = q.defer();
        CommentModel
            .find({favorId: favorId, hostId: hostId}, function (err, docs) {
                if(err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(docs);
                }
            });
        return deferred.promise;
    }

    function createComment(newComment) {
        var deferred = q.defer();
        CommentModel
            .create(newComment, function (err, doc) {
                if(err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(doc);
                }
            });
        return deferred.promise;
    }

    function createReplyById(commentId, newReply) {
        var deferred = q.defer();
        CommentModel
            .findOne(mongoose.Types.ObjectId(commentId), function (err, doc) {
                if(err) {
                    deferred.reject(err);
                } else {
                    doc.replies.push(newReply);
                    doc.save(function (err, doc) {
                       if(err) {
                           deferred.reject(err);
                       } else {
                           deferred.resolve(newReply);
                       }
                    });
                }
            });

        return deferred.promise;
    }

    function deleteCommentByIds(favorId, hostId) {
        var deferred = q.defer();
        CommentModel
            .remove({favorId: favorId, hostId: hostId}, function (err) {
                if(err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(true);
                }
            });
        return deferred.promise;
    }

};