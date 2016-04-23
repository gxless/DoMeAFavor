module.exports = function (mongoose, q, bcrypt) {

    var UserSchema = require("./user.schema.server.js")(mongoose);
    var UserModel = mongoose.model("UserModel", UserSchema);

    var api = {
        //user apis
        getUserById: getUserById,
        getUserByCredential: getUserByCredential,
        hasUsername: hasUsername,
        hasEmail: hasEmail,
        createUser: createUser,
        updateUserById: updateUserById,

        //friend apis
        getFriendsByUserId: getFriendsByUserId,
        unFriend: unFriend,
        isFriend: isFriend,
        addFriend: addFriend
    };

    return api;

    function getUserById(userId) {
        var deferred = q.defer();
        UserModel
            .findById(mongoose.Types.ObjectId(userId), function (err, doc) {
                if(err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(doc);
                }
            });
        return deferred.promise;
    }

    function getUserByCredential(credential) {
        var deferred = q.defer();

        UserModel.findOne({username: credential.username}, function (err, doc) {
            if(err) {
                deferred.reject(err);
            }
            if(doc) {
                if(bcrypt.compareSync(credential.password, doc.password)) {
                    deferred.resolve(doc);
                } else {
                    deferred.resolve(false);
                }
            } else {
                deferred.resolve(false);
            }

        });
        return deferred.promise;
    }

    function hasUsername(username) {
        var deferred = q.defer();
        UserModel
            .findOne({username: username}, function (err, doc) {
                if(err) {
                    deferred.reject(err);
                } else {
                    if(doc) {
                        deferred.resolve(true);
                    } else {
                        deferred.resolve(false);
                    }
                }
            });
        return deferred.promise;
    }

    function hasEmail(email) {
        var deferred = q.defer();
        UserModel
            .findOne({email: email}, function (err, doc) {
                if(err) {
                    deferred.reject(err);
                } else {
                    if(doc) {
                        deferred.resolve(true);
                    } else {
                        deferred.resolve(false);
                    }
                }
            });
        return deferred.promise;
    }

    function createUser(user) {
        var deferred = q.defer();
        var newUser = {
            "firstName": "",
            "lastName": "",
            "username": user.username,
            "password": bcrypt.hashSync(user.password),
            "city": "",
            "phone": "",
            "email": user.email,
            "description": "",
            "friends": [],
            "volunteer": true
        };
        if(newUser.username == "alice") newUser.volunteer = false;
        UserModel
            .create(newUser, function (err, doc) {
                if(err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(doc);
                }
            });
        return deferred.promise;
    }

    function updateUserById(userId, user) {
        var deferred = q.defer();
        userId = mongoose.Types.ObjectId(userId);
        delete user._id;
        if(user.changePass == true) {
            user.password = bcrypt.hashSync(user.password);
        }
        delete user.changePass;
        UserModel
            .findOneAndUpdate({_id: userId}, user, {new: true}, function (err, doc) {
                if(err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(doc);
                }
            });
        return deferred.promise;
    }

    //friends functions
    function getFriendsByUserId(userId) {
        var deferred = q.defer();
        UserModel
            .findById(mongoose.Types.ObjectId(userId), {friends: 1, _id: 0}, function (err, doc) {
                if(err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(doc);
                }
            });
        return deferred.promise;
    }

    function unFriend(userId, friendId) {
        var deferred = q.defer();
        UserModel
            .findById(mongoose.Types.ObjectId(friendId), function (err, doc) {
                if(err) {
                    deferred.reject(err);
                } else {
                    for(var i in doc.friends) {
                        if(doc.friends[i].userId == userId) {
                            doc.friends.splice(i, 1);
                            doc.save(function (err, doc) {
                                if(err) {
                                    deferred.reject(err);
                                } else {
                                    UserModel
                                        .findById(mongoose.Types.ObjectId(userId), function (err, doc) {
                                            if(err) {
                                                deferred.reject(err);
                                            } else {
                                                for(var i in doc.friends) {
                                                    if(doc.friends[i].userId == friendId) {
                                                        doc.friends.splice(i, 1);
                                                        doc.save(function (err, doc) {
                                                            if(err) {
                                                                deferred.reject(err);
                                                            } else {
                                                                deferred.resolve(doc.friends);
                                                            }
                                                        });;
                                                    }
                                                }
                                            }
                                        });
                                }
                            });
                            ;
                        }
                    }
                }
            });

        return deferred.promise;
    }

    function isFriend(userId, friendId) {
        var deferred = q.defer();
        UserModel
            .findById(mongoose.Types.ObjectId(userId), function (err, doc) {
                if(err) {
                    deferred.reject(err);
                } else {
                    for(var i in doc.friends) {
                        if(doc.friends[i].userId == friendId && doc.friends[i].isFriend == true) {
                            deferred.resolve(true);
                        }
                    }
                    deferred.resolve(false);
                }
            });
        return deferred.promise;
    }

    function addFriend(friendPair) {
        var deferred = q.defer();
        var newFriend1 = {
            "userId": friendPair.userId,
            "username": friendPair.username,
            "isFriend": true
        };
        var newFriend2 = {
            "userId": friendPair.friendId,
            "username": friendPair.friendUsername,
            "isFriend": true
        };

        UserModel
            .findById(mongoose.Types.ObjectId(friendPair.friendId), function (err, doc) {
                if(err) {
                    deferred.reject(err);
                } else {
                    doc.friends.push(newFriend1);
                    doc.save(function (err, doc) {
                        if(err) {
                            deferred.reject(err);
                        } else {
                            UserModel
                                .findById(mongoose.Types.ObjectId(friendPair.userId), function (err, doc) {
                                    if(err) {
                                        deferred.reject(err);
                                    } else {
                                        doc.friends.push(newFriend2);
                                        doc.save(function (err, doc) {
                                            if(err) {
                                                deferred.reject(err);
                                            } else {
                                                deferred.resolve(true);
                                            }
                                        });
                                    }
                                });
                        }
                    });
                }
            });
        return deferred.promise;
    }


};

