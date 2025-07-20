import mongoose from 'mongoose';

const meetingSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
		trim: true,
	},
	description: {
		type: String,
		required: true,
		trim: true,
	},
	startTime: String,
	endTime: String,
	addedFor: {
		type: Date,
		required: true,
	},
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
});

const Meeting = mongoose.model('Meeting', meetingSchema);
export default Meeting;
