module.exports = function (app) {
    var userModel = require("./../models/user.model.js")();

    app.get("/api/userService/user/:userId", getUserById);
    app.put("/api/userService/user/:userId", updateUserById);
    app.post("/api/userService/login", login);
    app.post("/api/userService/user", createUser);
    app.get("/api/userService/user/id/:username", getIdByUsername);
    app.get("/api/userService/user/email/:email", hasEmail);
    app.get("/api/userService/user/:userId/friendId/:friendId", isFriend);
    app.post("/api/userService/user/:userId/friend/:friendId", addFriend);
    app.get("/api/userService/user/:userId/friend", getFriendsById);
    app.delete("/api/userService/user/:userId/friend/:friendId", unFriend);


    function getUserById(req, res) {
        var userId = req.params.userId;
        var user = userModel.getUserById(userId);
        res.json(user);
    }

    function updateUserById(req, res) {
        var userId = req.params.userId;
        var updatedUser = userModel.updateUserById(userId, req.body);
        res.json(updatedUser);
    }

    function login(req, res) {
        var user = userModel.login(req.body);
        res.json(user);
    }

    function createUser(req, res) {
        var user = userModel.createUser(req.body);
        res.json(user);
    }

    function getIdByUsername(req, res) {
        var username = req.params.username;
        var userId = userModel.getIdByUsername(username);
        res.json(userId);
    }

    function hasEmail(req, res) {
        var email = req.params.email;
        var ifEmail = userModel.hasEmail(email);
        res.json(ifEmail);
    }

    function addFriend(req, res) {
        var userId = req.params.userId;
        var friendId = req.params.friendId;
        var friend = userModel.addFriend(userId, friendId);
        res.json(friend);
    }

    function isFriend(req, res) {
        var userId = req.params.userId;
        var friendId = req.params.friendId;
        var ifFriend = userModel.isFriend(userId, friendId);
        res.json(ifFriend);
    }

    function getFriendsById(req, res) {
        var userId = req.params.userId;
        var friends = userModel.getFriendsById(userId);
        res.json(friends);
    }

    function unFriend(req, res) {
        var userId = req.params.userId;
        var friendId = req.params.friendId;
        var deleted = userModel.unFriend(userId, friendId);
        res.json(deleted);
    }


};