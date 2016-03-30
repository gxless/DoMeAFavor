module.exports = function (app) {
    var reportModel = require("./../models/report.model.js")();

    app.get("/api/reportService/user/:userId/favor/:favorId/report", getReportByIds);
    app.post("/api/reportService/report", createReport);
    app.put("/api/reportService/report/:reportId", updateReportById);
    app.delete("/api/reportService/report/:reportId", deleteReportById);
    app.delete("/api/reportService/user/:userId/favor/:favorId/report", deleteReportByIds);


    function getReportByIds(req, res) {
        var userId = req.params.userId;
        var favorId = req.params.favorId;
        var reports = reportModel.getReportByIds(favorId, userId);
        res.json(reports);
    }

    function createReport(req, res) {
        var newReport = reportModel.createReport(req.body);
        res.json(newReport);
    }

    function updateReportById(req, res) {
        var updatedReport = reportModel.updateReportById(req.body);
        res.json(updatedReport);
    }

    function deleteReportById(req, res) {
        var reportId = req.params.reportId;
        var deleted = reportModel.deleteReportById(reportId);
        res.json(deleted);
    }

    function deleteReportByIds(req, res) {
        var userId = req.params.userId;
        var favorId = req.params.favorId;
        var deleted = reportModel.deleteReportByIds(favorId, userId);
        res.json(deleted);
    }

};