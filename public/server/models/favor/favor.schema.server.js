module.exports = function (mongoose) {

    var FavorSchema = mongoose.Schema({
        title: String,
        tagId: String,
        date: {type: Date, default: Date.now},
        coordinatorId: String,
        coordinator: String,
        joinedUsers: [{userId: String, username: String, joined: Boolean, _id : false }],
        position: {lat: Number, lng: Number},
        content: String
    }, {collection: "favor"});

    return FavorSchema;
};
