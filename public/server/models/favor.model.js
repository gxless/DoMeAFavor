module.exports = function () {
    var uuid = require("node-uuid");

    var favors = require("./favor.mock.json");
    var volunteerToFavor = require("./volunteerToFavor.mock.json");
    var userModel = require("./user.model.js");
    var reportModel = require("./report.model.js");
    var commentModel = require("./comment.model.js");

    var api = {
        getFavorsByUserId: getFavorsByUserId,
        getFavorsByTagId: getFavorsByTagId,
        createFavor: createFavor,
        getFavorById: getFavorById,
        getJoinedUsersById: getJoinedUsersById,

        joinFavor: joinFavor,
        hasJoined: hasJoined,
        hasRequest: hasRequest,
        disjoinFavor: disjoinFavor,
        agreeJoin: agreeJoin,
        rejectJoin: rejectJoin,

        deleteFavorById: deleteFavor
    };

    return api;

    function getFavorsByUserId(userId) {
        var joinedFavors = [];
        for(var i in volunteerToFavor) {
            if(volunteerToFavor[i].userId == userId && volunteerToFavor[i].joined == true) {
                joinedFavors.push(getFavorById(volunteerToFavor[i].favorId));
            }
        }
        return joinedFavors.reverse();
    }

    function getFavorsByTagId(tagId) {
        var getFavors = [];
        if(tagId == 0) {
            return favors;
        } else {
            for(var i in favors) {
                if(favors[i].tagId == tagId) {
                    getFavors.push(favors[i]);
                }
            }
        }
        return getFavors;
    }

    function getFavorById(favorId) {
        for(var i in favors) {
            if(favors[i]._id == favorId) {
                return favors[i];
            }
        }
        return null;
    }

    function createFavor(favor) {
        favor._id = uuid.v1();
        favors.push(favor);
        var newJoinedUser = {"favorId": favor._id, "userId": favor.coordinatorId, "joined": true};
        volunteerToFavor.push(newJoinedUser);
        return favor;
    }


    function joinFavor(favorId, userId) {
        var newJoinedUser = {"favorId": favorId, "userId": userId, "joined": false};
        volunteerToFavor.push(newJoinedUser);
        return newJoinedUser;
    }

    function disjoinFavor(favorId, userId) {
        for(var i in volunteerToFavor) {
            if(volunteerToFavor[i].userId == userId && volunteerToFavor[i].favorId == favorId) {
                volunteerToFavor.splice(i, 1);
                break;
            }
        }
    }


    function agreeJoin(favorId, userId) {
        for(var i in volunteerToFavor) {
            if(volunteerToFavor[i].userId == userId && volunteerToFavor[i].favorId == favorId) {
                volunteerToFavor[i].joined = true;
                return true;
            }
        }
        return false;
    }

    function rejectJoin(favorId, userId) {
        for(var i in volunteerToFavor) {
            if(volunteerToFavor[i].userId == userId && volunteerToFavor[i].favorId == favorId) {
                volunteerToFavor.splice(i, 1);
                reportModel().deleteReportByIds(favorId, userId);
                commentModel().deleteCommentByIds(favorId, userId);
                return true;
            }
        }
        return false;
    }


    function getJoinedUsersById(favorId) {
        var joinedUsers = [];
        for(var i in volunteerToFavor) {
            if(volunteerToFavor[i].favorId == favorId) {
                var joinedUser = JSON.parse(JSON.stringify(volunteerToFavor[i]));
                var userId = volunteerToFavor[i].userId;
                joinedUser.username = userModel().getUsernameById(userId);
                joinedUsers.push(joinedUser);
            }
        }
        return joinedUsers;
    }

    function hasJoined(userId, favorId) {
        for(var i in volunteerToFavor) {
            if(volunteerToFavor[i].userId == userId && volunteerToFavor[i].favorId == favorId) {
                return volunteerToFavor[i].joined;
            }
        }
        return false;
    }

    function hasRequest(userId, favorId) {
        for(var i in volunteerToFavor) {
            if(volunteerToFavor[i].userId == userId && volunteerToFavor[i].favorId == favorId) {
                return true;
            }
        }
        return false;
    }


    //old
    function deleteFavor(favorId) {
        for(var i in favors) {
            if(favors[i]._id == favorId) {
                favors.splice(i, 1);
                break;
            }
        }
    }

};
