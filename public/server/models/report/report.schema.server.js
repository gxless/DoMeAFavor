module.exports = function (mongoose) {

    var ReportSchema = mongoose.Schema({
        date: Date,
        favorId: String,
        userId: String,
        content: String
    }, {collection: "report"});

    return ReportSchema;
};
