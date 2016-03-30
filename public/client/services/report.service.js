(function () {
    "use strict";
    angular
        .module("DoMeAFavorApp")
        .factory("ReportService", ReportService);

    function ReportService($q, $http) {
        var api = {
            createReport: createReport,
            getReportByIds: getReportByIds,
            updateReportById: updateReportById,
            deleteReportById: deleteReportById
        };

        return api;

        function createReport(report) {
            var deferred = $q.defer();
            $http.post("/api/reportService/report", report)
                .success(function (response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function getReportByIds(favorId, userId) {
            var deferred = $q.defer();
            $http.get("/api/reportService/user/" + userId + "/favor/" + favorId + "/report")
                .success(function (response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function updateReportById(report) {
            var deferred = $q.defer();
            $http.put("/api/reportService/report/" + report._id, report)
                .success(function (response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function deleteReportById(reportId) {
            var deferred = $q.defer();
            $http.delete("/api/reportService/report/" + reportId)
                .success(function (response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

    }

})();