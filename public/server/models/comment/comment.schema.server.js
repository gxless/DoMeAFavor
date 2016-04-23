module.exports = function (mongoose) {

    var CommentSchema = mongoose.Schema({
        date: Date,
        favorId: String,
        hostId: String,
        commenterId: String,
        commenter: String,
        content: String,
        replies: [
            {
                replierId: String,
                replier: String,
                hostId: String,
                host: String,
                date: Date,
                content: String,
                _id : false
            }
        ]
    }, {collection: "comment"});

    return CommentSchema;
};
