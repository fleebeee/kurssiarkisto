var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CommentSchema = new Schema({
	userID: {
		type: Schema.Types.ObjectId,
		required: true,
	},

	courseCode: {
		type: String,
		required: true,
	},

	timestamp: { // timestamp of the comment in UTC milliseconds
		type: Date,
		required: true,
	},

	content: { // comment content
		type: String,
		required: true,
	},

})



module.exports = mongoose.model('Comment', CommentSchema);
