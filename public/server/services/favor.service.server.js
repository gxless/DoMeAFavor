module.exports = function (app, FavorModel, ReportModel, CommentModel) {

    //favor endpoints
    app.get("/api/favorService/tag/:tagId/favor", getFavorsByTagId);
    app.get("/api/favorService/user/:userId/favor", getFavorsByUserId);
    app.get("/api/favorService/favor/:favorId", getFavorById);
    app.post("/api/favorService/favor", createFavor);

    //join endpoints
    app.get("/api/favorService/favor/:favorId/volunteer/:userId/requested", hasRequest);
    app.post("/api/favorService/favor/:favorId/user/:userId", joinFavor);
    app.put("/api/favorService/favor/:favorId/user/:userId", agreeJoin);
    app.delete("/api/favorService/favor/:favorId/user/:userId", rejectJoin);
    app.delete("/api/favorService/favor/:favorId/user/:userId/disjoin", disJoin);


    //favor functions
    function getFavorsByTagId(req, res) {
        FavorModel.getFavorsByTagId(req.params.tagId)
            .then(function (response) {
                res.json(response);
            });
    }

    function getFavorsByUserId(req, res) {
        FavorModel.getFavorsByUserId(req.params.userId)
            .then(function (response) {
                res.json(response);
            });
    }

    function getFavorById(req, res) {
        FavorModel.getFavorById(req.params.favorId)
            .then(function (response) {
                res.json(response);
            });
    }

    function createFavor(req, res) {
        FavorModel.createFavor(req.body)
            .then(function (response) {
                res.json(response);
            });
    }


    //join functions
    function hasRequest(req, res) {
        FavorModel.hasRequest(req.params.favorId, req.params.userId)
            .then(function (response) {
                res.json(response);
            });
    }

    function joinFavor(req, res) {
        FavorModel.joinFavor(req.params.favorId, req.body.userId, req.body.username)
            .then(function (response) {
                res.json(response);
            });
    }

    function agreeJoin(req, res) {
        FavorModel.agreeJoin(req.params.favorId, req.params.userId)
            .then(function (response) {
                res.json(response);
            });
    }

    function rejectJoin(req, res) {
        FavorModel.rejectJoin(req.params.favorId, req.params.userId)
            .then(function (response) {
                res.json(response);
            });
    }

    function disJoin(req, res) {
        ReportModel.deleteReportByIds(req.params.favorId, req.params.userId)
            .then(function (response) {
                if(response) {

                    CommentModel.deleteCommentByIds(req.params.favorId, req.params.userId)
                        .then(function (response) {
                            if(response) {

                                FavorModel.rejectJoin(req.params.favorId, req.params.userId)
                                    .then(function (response) {
                                        res.json(response);
                                    });
                            }
                    });
                }
            });



    }


};