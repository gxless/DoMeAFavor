module.exports = function (mongoose) {

    var UserSchema = mongoose.Schema({
        firstName: String,
        lastName: String,
        username: String,
        password: String,
        city: String,
        phone: String,
        email: String,
        description: String,
        friends: [{userId: String, username: String, isFriend: Boolean, _id : false }],
        volunteer: Boolean
    }, {collection: "user"});

    return UserSchema;
};