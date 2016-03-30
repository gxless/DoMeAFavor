module.exports = function (app) {
    require("./services/comment.service.server.js")(app);
    require("./services/favor.service.server.js")(app);
    require("./services/report.service.server.js")(app);
    require("./services/user.service.server.js")(app);
};