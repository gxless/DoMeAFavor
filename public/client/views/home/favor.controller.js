(function () {
    "use strict";
    angular
       .module("DoMeAFavorApp")
       .controller("FavorController", FavorController);

    function FavorController($scope, $location, $routeParams, $anchorScroll, UserService, ReportService, FavorService, CommentService) {

        var favorId = $routeParams.favorId;
        var viewedUserId = $routeParams.userId;
        $scope.hasAccess = false;
        $scope.adminFavor = false;
        var currentUser = UserService.getCurrentUser();

        //initialize to display favors based on users' identities
        if(currentUser) {
            //if user logs in
            var userId = currentUser._id;
            //whether viewed user is logged in user
            if(userId == viewedUserId) {
                $scope.hasAccess = true;
                //whether logged in user is coordinator
                if(!currentUser.volunteer) {
                    $scope.adminFavor = true;
                }
            }
        }


        //retrieve favor to display
        FavorService.getFavorById(favorId)
            .then(function (response) {
                $scope.favor = response;
            });

        ReportService.getReportByIds(favorId, viewedUserId)
            .then(function (response) {
                $scope.reports = response;
            });

        FavorService.getJoinedUsersById(favorId)
            .then(function (response) {
                $scope.joinedUsers = response;
            });


        //coordinate edit join request
        if(currentUser) {
            FavorService.hasJoined(userId, favorId)
                .then(function (response) {
                    $scope.hasJoined = response;
                });
        }



        $scope.agreeJoin = agreeJoin;
        $scope.rejectJoin = rejectJoin;
        $scope.joinFavor = joinFavor;

        function agreeJoin(userId) {
            FavorService.agreeJoin(favorId, userId)
                .then(function (response) {
                    if(response) {
                        for(var i in $scope.joinedUsers) {
                            if($scope.joinedUsers[i].userId == userId) {
                                $scope.joinedUsers[i].joined = true;
                                break;
                            }
                        }
                    }
                });
        }

        function rejectJoin(userId) {
            FavorService.rejectJoin(favorId, userId)
                .then(function (response) {
                    if(response) {
                        for(var i in $scope.joinedUsers) {
                            if($scope.joinedUsers[i].userId == userId) {
                                $scope.joinedUsers.splice(i, 1);
                                break;
                            }
                        }
                    }
                });
        }

        function joinFavor() {
            if(!currentUser) {
                $location.url("/login");
            } else {
                FavorService.hasRequest(userId, favorId)
                    .then(function (response) {
                        if (!response) {
                            FavorService.joinFavor(favorId, userId)
                                .then(function (response) {
                                    var newJoinedUser = response;
                                    $scope.joinedUsers.push(newJoinedUser);
                                });
                        }
                    });
            }
        }

        //new report section including create report, show new post and disJoin favor
        $scope.newPost = false;
        $scope.join = true;
        $scope.showNewPost = showNewPost;
        $scope.showDisjoin = showDisjoin;
        $scope.disjoin = disjoin;
        $scope.cancelDisjoin = cancelDisjoin;
        $scope.createReport = createReport;

        function showNewPost() {
            $scope.newPost = !$scope.newPost;
            $scope.content = null;
        }

        function showDisjoin() {
            $scope.join = false;
        }

        function disjoin() {
            FavorService.rejectJoin(favorId, userId)
                .then(function (response) {
                    if(response) {
                        $location.url("/" + userId + "/favors");
                    }
                });
        }

        function cancelDisjoin() {
            $scope.join = true;
        }

        function createReport(content) {
            if(content) {
                var newReport = {
                    "date": new Date().toString(),
                    "favorId": favorId,
                    "userId": userId,
                    "content": content
                };
                $scope.content = null;
                ReportService.createReport(newReport)
                    .then(function (response) {
                        $scope.reports.unshift(response);
                        $scope.newPost = false;
                    });
            }
        }


        //edit report section including show report edit, update and delete report
        $scope.edit = false;
        $scope.selectedEdit = null;
        $scope.showEdit = showEdit;
        $scope.notShowEdit = notShowEdit;
        $scope.updateReport = updateReport;
        $scope.deleteReport = deleteReport;

        function showEdit(index) {
            $scope.selectedEdit = index;
            $scope.edit = true;
            $scope.editContent = angular.copy($scope.reports[index]);
        }

        function notShowEdit() {
            $scope.selectedEdit = null;
            $scope.edit = false;
            $scope.editContent = null;
        }


        function updateReport(index, report) {
            if(report.content) {
                ReportService.updateReportById(report)
                    .then(function (response) {
                        $scope.reports[index] = response;
                        $scope.selectedEdit = null;
                        $scope.edit = false;
                        $scope.editContent = null;
                    });

            }
        }

        function deleteReport(index, reportId) {
            ReportService.deleteReportById(reportId)
                .then(function (response) {
                    if(response) {
                        $scope.reports.splice(index, 1);
                        $scope.selectedEdit = null;
                        $scope.edit = false;
                        $scope.editContent = null;
                    }
                });
        }


        //common functions
        $scope.getLiteralDate = getLiteralDate;
        $scope.getLiteralTime = getLiteralTime;



        function getLiteralDate(dateString) {
            var date = new Date(dateString);
            var dateOri = date.toDateString();
            var dateLiteral = dateOri.substring(4, 7) + ". " + date.getDate() + ", " + date.getFullYear();
            return dateLiteral;
        }

        function getLiteralTime(timeString) {
            var date = new Date(timeString);
            var dateOri = date.toDateString();
            var dateLiteral = dateOri.substring(4, 7) + " " + date.getDate() + "'" + dateOri.slice(-2);
            var time = new Date(timeString);
            var hours = time.getHours();
            var minutes = time.getMinutes();
            if(hours < 10) {
                hours = "0" + hours;
            }
            if(minutes < 10) {
                minutes = "0" + minutes;
            }
            var timeLiteral = hours + ":" + minutes + " ";
            return timeLiteral + dateLiteral;
        }


        //comment section
        var hostId = $routeParams.userId;
        var currentCommentId = null;
        var currentReplyHostId = null;
        var selectedCommentIndex = null;
        $scope.isReply = false;
        $scope.commentPlaceholder = "leave a comment to this favor..";
        $scope.commentBtnText = "Comment";

        CommentService.getCommentByIds(favorId, hostId)
            .then(function (response) {
                $scope.comments = response;
            });

        $scope.makeComment = makeComment;
        $scope.requestReply = requestReply;
        $scope.cancelReply = cancelReply;

        function requestReply(commentId, replyHostId, replyHost, commentIndex) {

            if(!currentUser) {
                $location.url("/login");
            } else {
                $scope.isReply = true;
                selectedCommentIndex = commentIndex;
                currentCommentId = angular.copy(commentId);
                currentReplyHostId = angular.copy(replyHostId);
                $scope.commentPlaceholder = "reply to " + replyHost + "..";
                $scope.commentBtnText = "Reply";
                $anchorScroll("anchor");
            }
        }

        function cancelReply() {
            $scope.isReply = false;
            currentCommentId = null;
            selectedCommentIndex = null;
            $scope.comment = null;
            $scope.commentPlaceholder = "leave a comment to this favor..";
            $scope.commentBtnText = "Comment";
        }

        function makeComment(comment) {
            if(!currentUser) {
                $location.url("/login");
            } else {
                if($scope.isReply) {
                    if(comment) {
                        var newReply = {
                            "replierId": currentUser._id,
                            "hostId": currentReplyHostId,
                            "date": new Date().toString(),
                            "content": comment
                        };

                        CommentService.createReplyById(currentCommentId, newReply)
                            .then(function (response) {
                                $scope.comments[selectedCommentIndex].replies.push(response);
                                $scope.comment = null;
                                $scope.isReply = false;
                                currentCommentId = null;
                                selectedCommentIndex = null;
                                $scope.commentPlaceholder = "leave a comment to this favor..";
                                $scope.commentBtnText = "Comment";
                            });
                    }
                } else {
                    if(comment) {
                        var newComment = {
                            "date": new Date().toString(),
                            "favorId": favorId,
                            "hostId": hostId,
                            "commenterId": currentUser._id,
                            "content": comment,
                            "replies":[]
                        };
                        CommentService.createComment(newComment)
                            .then(function (response) {
                                $scope.comments.unshift(response);
                                $scope.comment = null;
                                $scope.commenter = null;
                                $scope.commentPlaceholder = "leave a comment to this favor..";
                                $scope.commentBtnText = "Comment";
                            });
                    }
                }
            }

        }



    }

})();