module.exports = function (app, UserModel, passport, bcrypt, LocalStrategy) {

    //passport
    var auth = authorized;
    passport.use(new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    function authorized(req, res, next) {
        if(!req.isAuthenticated()) {
            res.send(401);
        } else {
            next();
        }
    }

    function localStrategy(username, password, done) {
        UserModel
            .getUserByCredential({username: username, password: password})
            .then(
                function (response) {
                    if (!response) {
                        return done(null, false);
                    } else {
                        return done(null, response);
                    }
                },
                function(err) {
                    if(err) {
                        return done(err);
                    }
                });
    }

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        UserModel
            .getUserById(user._id)
            .then(
                function (response) {
                    done(null, response);
                },
                function (err) {
                    done(err, null);
                });
    }


    //user endpoints
    app.post("/api/userService/login", passport.authenticate("local"), login);
    app.post("/api/userService/logout", logout);
    app.get("/api/userService/loggedin", loggedin);

    app.get("/api/userService/user/:userId", getUserById);
    app.get("/api/userService/user/id/:username", hasUsername);
    app.get("/api/userService/user/email/:email", hasEmail);
    app.post("/api/userService/user", createUser);
    app.put("/api/userService/user/:userId", auth, updateUserById);

    //friend endpoints
    app.get("/api/userService/user/:userId/friend", auth, getFriendsByUserId);
    app.get("/api/userService/user/:userId/friendId/:friendId", auth, isFriend);
    app.delete("/api/userService/user/:userId/friend/:friendId", auth, unFriend);
    app.post("/api/userService/user/:userId/friend/:friendId", auth, addFriend);


    //user functions
    function login(req, res) {
        var user = req.user;
        res.json(user);
    }

    function logout(req, res) {
        req.logOut();
        res.send(200);
    }

    function loggedin(req, res) {
        res.send(req.isAuthenticated() ? req.user : "0");
    }

    function getUserById(req, res) {
        UserModel.getUserById(req.params.userId)
            .then(function (response) {
                res.json(response);
            });
    }

    function hasUsername(req, res) {
        UserModel.hasUsername(req.params.username)
            .then(function (response) {
                res.json(response);
            });
    }

    function hasEmail(req, res) {
        UserModel.hasEmail(req.params.email)
            .then(function (response) {
                res.json(response);
            });
    }

    function createUser(req, res) {
        UserModel.createUser(req.body)
            .then(function (user) {
                req.login(user, function(err)
                {
                    if(err) { return next(err); }
                    res.json(user);
                });
            });
    }

    function updateUserById(req, res) {
        UserModel.updateUserById(req.params.userId, req.body)
            .then(function (response) {
                res.json(response);
            });
    }


    //friend functions
    function getFriendsByUserId(req, res) {
        UserModel.getFriendsByUserId(req.params.userId)
            .then(function (response) {
                res.json(response);
            });
    }

    function unFriend(req, res) {
        UserModel.unFriend(req.params.userId, req.params.friendId)
            .then(function (response) {
                res.json(response);
            });
    }

    function isFriend(req, res) {
        UserModel.isFriend(req.params.userId, req.params.friendId)
            .then(function (response) {
                res.json(response);
            });
    }

    function addFriend(req, res) {
        UserModel.addFriend(req.body)
            .then(function (response) {
                res.json(response);
            });
    }


};