module.exports = function () {
    var uuid = require("node-uuid");
    var users = require("./user.mock.json");
    var userToUser = require("./userToUser.mock.json");


    var api = {
        getAllUsers: getAllUsers,
        getAllCoordinators: getAllCoordinators,
        deleteUserById: deleteUserById,
        updateUserById: updateUserById,
        createUser: createUser,

        login: login,
        getUserById: getUserById,
        getIdByUsername: getIdByUsername,
        getUsernameById: getUsernameById,
        hasEmail: hasEmail,

        getFriendsById: getFriendsById,
        addFriend: addFriend,
        isFriend: isFriend,
        unFriend: unFriend

    };

    return api;

    function getAllUsers() {
        return users;
    }

    function hasEmail(email) {
        for (var i in users) {
            if (users[i].email == email) {
                return true;
            }
        }
        return false;
    }

    function getAllCoordinators() {
        var coordinators = [];
        for (var i in users) {
            if (users[i].volunteer == false) {
                var coordinator = {
                    _id: users[i]._id,
                    username: users[i].username
                };
                coordinators.push(coordinator);
            }
        }
        return coordinators;
    }

    function deleteUserById(userId) {
        for (var i in users) {
            if (users[i]._id == userId) {
                users.splice(i, 1);
                return users;

            }
        }
    }

    function getUserById(userId) {
        for (var i in users) {
            if (users[i]._id == userId) {
                return users[i];
            }
        }
        return null;
    }

    function login(credentials) {
        for (var i in users) {
            if (users[i].username == credentials.username && users[i].password == credentials.password) {
                return users[i];
            }
        }
        return null;
    }

    function updateUserById(userId, user) {
        console.log()
        for (var i in users) {
            if (users[i]._id == userId) {
                users[i] = user;
                return users[i];
            }
        }
    }

    function createUser(user) {
        var newUser = {
            "_id": uuid.v1(),
            "firstName": "",
            "lastName": "",
            "username": user.username,
            "password": user.password,
            "dob": "",
            "city": "",
            "phone": "",
            "email": user.email,
            "description": "",
            "volunteer": true
        };
        users.push(newUser);
        return newUser;
    }


    function getUsernameById(userId) {
        for (var i in users) {
            if (userId == users[i]._id) {
                return users[i].username;
            }
        }
    }

    function getIdByUsername(username) {
        for (var i in users) {
            if (username == users[i].username) {
                return users[i]._id;
            }
        }
        return null;
    }

    //friends functions
    function getFriendsById(userId) {
        var friends = [];
        for(var i in userToUser) {
            if(userToUser[i].userId == userId && userToUser[i].isFriend == true) {
                var friend = {
                    "friendId": userToUser[i].friendId,
                    "friend": getUsernameById(userToUser[i].friendId)
                };
                friends.push(friend);
            }
        }
        return friends;
    }


    function addFriend(userId, friendId) {
        var newFriendPair = {
            "userId": userId,
            "friendId": friendId,
            "isFriend": true
        };
        var friendPair = {
            "userId": friendId,
            "friendId": userId,
            "isFriend": true
        };
        userToUser.push(newFriendPair);
        userToUser.push(friendPair);
        return true;
    }

    function unFriend(userId, friendId) {
        var firstIndex, secondIndex;
        for (var i in userToUser) {
            if (userToUser[i].userId == userId && userToUser[i].friendId == friendId) {
                firstIndex = i;
            }
            if (userToUser[i].userId == friendId && userToUser[i].friendId == userId) {
                secondIndex = i;
            }
        }
        if (firstIndex > secondIndex) {
            userToUser.splice(firstIndex, 1);
            userToUser.splice(secondIndex, 1);
            return true;
        } else {
            userToUser.splice(secondIndex, 1);
            userToUser.splice(firstIndex, 1);
            return true;
        }
    }

    function isFriend(userId, friendId) {
        for (var i in userToUser) {
            if (userToUser[i].userId == userId && userToUser[i].friendId == friendId && userToUser[i].isFriend == true) {
                return true;
            }
        }
        return false;
    }


};

