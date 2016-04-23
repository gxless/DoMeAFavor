module.exports = function (app, db, mongoose, q, passport, bcrypt, LocalStrategy) {

    var UserModel = require("./models/user/user.model.server.js")(mongoose, q, bcrypt);
    var FavorModel = require("./models/favor/favor.model.server.js")(mongoose, q);
    var CommentModel = require("./models/comment/comment.model.server.js")(mongoose, q);
    var ReportModel = require("./models/report/report.model.server.js")(mongoose, q);

    require("./services/user.service.server.js")(app, UserModel, passport, bcrypt, LocalStrategy);
    require("./services/favor.service.server.js")(app, FavorModel, ReportModel, CommentModel);
    require("./services/comment.service.server.js")(app, CommentModel);
    require("./services/report.service.server.js")(app, ReportModel);
};