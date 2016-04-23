module.exports = function (mongoose, q) {

    var FavorSchema = require("./favor.schema.server.js")(mongoose);
    var FavorModel = mongoose.model("Favormodel", FavorSchema);

    var api = {
        //favor apis
        getFavorsByTagId: getFavorsByTagId,
        getFavorsByUserId: getFavorsByUserId,
        getFavorById: getFavorById,
        createFavor: createFavor,

        //join apis
        hasRequest: hasRequest,
        joinFavor: joinFavor,
        agreeJoin: agreeJoin,
        rejectJoin: rejectJoin,
        disJoin: disJoin
    };

    return api;

    //favor functions
    function getFavorsByTagId(tagId) {
        var deferred = q.defer();
        if(tagId == 0) {
            FavorModel
                .find(function (err, docs) {
                    if(err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve(docs);
                    }
                });
        } else {
            FavorModel
                .find({tagId: tagId}, function (err, docs) {
                    if (err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve(docs);
                    }
                });
        }
        return deferred.promise;
    }

    function getFavorsByUserId(userId) {
        var deferred = q.defer();
        FavorModel
            .find({joinedUsers: {$elemMatch: {userId: userId, joined: true}}}, function (err, docs) {
                if(err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(docs);
                }
            });
        return deferred.promise;
    }

    function getFavorById(favorId) {
        var deferred = q.defer();
        FavorModel
            .findById(mongoose.Types.ObjectId(favorId), function (err, doc) {
                if(err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(doc);
                }
            });
        return deferred.promise;
    }

    function createFavor(favor) {
        var deferred = q.defer();
        FavorModel
            .create(favor, function (err, doc) {
                if(err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(doc);
                }
            });
        return deferred.promise;
    }


    //join funtions
    function hasRequest(favorId, userId) {
        var deferred = q.defer();
        FavorModel
            .find({_id: mongoose.Types.ObjectId(favorId), joinedUsers: {$elemMatch: {userId: userId}}},
            function (err, doc) {
                if(err) {
                    deferred.reject(err);
                }
                if(doc.length != 0){
                    deferred.resolve(true);
                } else {
                    deferred.resolve(false);
                }
            });
        return deferred.promise;
    }

    function joinFavor(favorId, userId, username) {
        var deferred = q.defer();
        FavorModel
            .findById(mongoose.Types.ObjectId(favorId), function (err, doc) {
                if(err) {
                    deferred.reject(err);
                } else {
                    doc.joinedUsers.push({
                        "userId": userId,
                        "username": username,
                        "joined": false
                    });
                    doc.save(function (err, doc) {
                        if(err) {
                            deferred.reject(err);
                        } else {
                            deferred.resolve(doc.joinedUsers);
                        }
                    });
                }
            });
        return deferred.promise;
    }

    function agreeJoin(favorId, userId) {
        var deferred = q.defer();
        FavorModel
            .findOneAndUpdate({_id: mongoose.Types.ObjectId(favorId), "joinedUsers.userId": userId},
                {$set: {"joinedUsers.$.joined": true}}, {new: true}, function (err, doc) {
                if(err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(doc.joinedUsers);
                }
            });
        return deferred.promise;
    }

    function rejectJoin(favorId, userId) {
        var deferred = q.defer();
        FavorModel
            .findOneAndUpdate({_id: mongoose.Types.ObjectId(favorId)},
                {$pull: {joinedUsers: {userId: userId}}}, {new: true}, function (err, doc) {
                    if(err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve(doc.joinedUsers);
                    }
                });
        return deferred.promise;
    }

    function disJoin(favorId, userId) {
        var deferred = q.defer();
        FavorModel
            .findOneAndUpdate({_id: mongoose.Types.ObjectId(favorId)},
                {$pull: {joinedUsers: {userId: userId}}}, {new: true}, function (err, doc) {
                    if(err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve(true);
                    }
                });
        return deferred.promise;
    }

};
