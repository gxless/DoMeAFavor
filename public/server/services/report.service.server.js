module.exports = function (app, ReportModel) {

    app.get("/api/reportService/user/:userId/favor/:favorId/report", getReportByIds);
    app.post("/api/reportService/report", createReport);
    app.put("/api/reportService/report/:reportId", updateReportById);
    app.delete("/api/reportService/report/:reportId", deleteReportById);


    function getReportByIds(req, res) {
        ReportModel.getReportByIds(req.params.favorId, req.params.userId)
            .then(function (response) {
                res.json(response);
            });
    }

    function createReport(req, res) {
        ReportModel.createReport(req.body)
            .then(function (response) {
                res.json(response);
            });
    }

    function updateReportById(req, res) {
        ReportModel.updateReportById(req.params.reportId, req.body)
            .then(function (response) {
                res.json(response);
            });
    }

    function deleteReportById(req, res) {
        ReportModel.deleteReportById(req.params.reportId)
            .then(function (response) {
                res.json(response);
            });
    }


};