module.exports = function () {

    var uuid = require("node-uuid");
    var reports = require("./report.mock.json");

    var api = {
        createReport: createReport,
        getReportByIds: getReportByIds,
        updateReportById: updateReportById,
        deleteReportById: deleteReportById,
        deleteReportByIds: deleteReportByIds
    };

    return api;

    function createReport(report) {
        report._id = uuid.v1();
        reports.push(report);
        return report;
    }

    function getReportByIds(favorId, userId) {
        var getReports = [];
        for (var i in reports) {
            if (reports[i].userId == userId && reports[i].favorId == favorId) {
                getReports.push(reports[i]);
            }
        }
        return getReports.reverse();
    }

    function updateReportById(report) {
        for (var i in reports) {
            if (reports[i]._id == report._id) {
                reports[i] = report;
                return report;
            }
        }
    }

    function deleteReportById(reportId) {
        for (var i in reports) {
            if (reports[i]._id == reportId) {
                reports.splice(i, 1);
                return true;
            }
        }
    }

    function deleteReportByIds(favorId, userId) {
        var removeList = [];
        for (var i in reports) {
            if (reports[i].userId == userId && reports[i].favorId == favorId) {
                removeList.push(i);
            }
        }
        for(var i = removeList.length - 1; i >= 0; i--) {
            reports.splice(removeList[i], 1);
        }
    }

};