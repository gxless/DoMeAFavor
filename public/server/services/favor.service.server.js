module.exports = function (app) {
    var favorModel = require("./../models/favor.model.js")();

    app.get("/api/favorService/user/:userId/favor", getFavorsByUserId);
    app.get("/api/favorService/tag/:tagId/favor", getFavorsByTagId);
    app.get("/api/favorService/favor/:favorId", getFavorById);
    app.get("/api/favorService/favor/:favorId/volunteer", getJoinedUsersById);
    app.get("/api/favorService/favor/:favorId/volunteer/:userId/joined", hasJoined);
    app.get("/api/favorService/favor/:favorId/volunteer/:userId/requested", hasRequest);
    app.post("/api/favorService/favor", createFavor);
    app.post("/api/favorService/favor/:favorId/user/:userId", joinFavor);
    app.put("/api/favorService/favor/:favorId/user/:userId", agreeJoin);
    app.delete("/api/favorService/favor/:favorId/user/:userId", rejectJoin);


    function getFavorsByUserId(req, res) {
        var userId = req.params.userId;
        var favors = favorModel.getFavorsByUserId(userId);
        res.json(favors);
    }

    function getFavorsByTagId(req, res) {
        var tagId = req.params.tagId;
        var favors = favorModel.getFavorsByTagId(tagId);
        res.json(favors);
    }

    function getFavorById(req, res) {
        var favorId = req.params.favorId;
        var favor = favorModel.getFavorById(favorId);
        res.json(favor);
    }

    function getJoinedUsersById(req, res) {
        var favorId = req.params.favorId;
        var volunteers = favorModel.getJoinedUsersById(favorId);
        res.json(volunteers);
    }

    function hasJoined(req, res) {
        var userId = req.params.userId;
        var favorId = req.params.favorId;
        var joinStatus = favorModel.hasJoined(userId, favorId);
        res.json(joinStatus);
    }

    function hasRequest(req, res) {
        var userId = req.params.userId;
        var favorId = req.params.favorId;
        var requestStatus = favorModel.hasRequest(userId, favorId);
        res.json(requestStatus);
    }

    function joinFavor(req, res) {
        var userId = req.params.userId;
        var favorId = req.params.favorId;
        var joinedFavor = favorModel.joinFavor(favorId, userId);
        res.json(joinedFavor);
    }

    function agreeJoin(req, res) {
        var userId = req.params.userId;
        var favorId = req.params.favorId;
        var joinedFavor = favorModel.agreeJoin(favorId, userId);
        res.json(joinedFavor);
    }

    function rejectJoin(req, res) {
        var userId = req.params.userId;
        var favorId = req.params.favorId;
        var deleted = favorModel.rejectJoin(favorId, userId);
        res.json(deleted);
    }

    function createFavor(req, res) {
        var newFavor = favorModel.createFavor(req.body);
        res.json(newFavor);
    }

};