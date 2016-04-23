module.exports = function (mongoose, q) {

    var ReportSchema = require("./report.schema.server.js")(mongoose);
    var ReportModel = mongoose.model("ReportModel", ReportSchema);

    var api = {
        getReportByIds: getReportByIds,
        createReport: createReport,
        updateReportById: updateReportById,
        deleteReportById: deleteReportById,
        deleteReportByIds: deleteReportByIds
    };

    return api;

    function getReportByIds(favorId, userId) {
        var deferred = q.defer();
        ReportModel
            .find({favorId: favorId, userId: userId}, function (err, docs) {
                if(err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(docs);
                }
            });
        return deferred.promise;
    }

    function createReport(report) {
        var deferred = q.defer();
        ReportModel
            .create(report, function (err, doc) {
                if(err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(doc);
                }
            });
        return deferred.promise;
    }

    function updateReportById(reportId, report) {
        var deferred = q.defer();
        ReportModel
            .findById(mongoose.Types.ObjectId(reportId), function (err, doc) {
                if(err) {
                    deferred.reject(err);
                } else {
                    doc.content = report.content;
                    doc.save(function (err) {
                        if(err) {
                            deferred.reject(err);
                        } else {
                            deferred.resolve(doc);
                        }
                    })
                }
            });
        return deferred.promise;
    }

    function deleteReportById(reportId) {
        var deferred = q.defer();
        ReportModel
            .remove({_id: mongoose.Types.ObjectId(reportId)}, function (err) {
                if(err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(true);
                }
            });
        return deferred.promise;
    }

    function deleteReportByIds(favorId, userId) {
        var deferred = q.defer();
        ReportModel
            .remove({favorId: favorId, userId: userId}, function (err) {
                if(err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(true);
                }
            });
        return deferred.promise;
    }


};