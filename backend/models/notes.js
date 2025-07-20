import mongoose from 'mongoose';

const notesSchema = new mongoose.Schema({
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
	priority: {
		type: String,
		required: true,
		enum: ['low', 'medium', 'high'],
	},
	columnTitle: {
		type: String,
		required: [true, 'A board must have a columnTitle'],
		enum: ['To-do', 'In-Progress', 'Completed'],
		default: 'To-do',
	},
	pinned: {
		type: Boolean,
		default: false,
	},
	archived: {
		type: Boolean,
		default: false,
	},
	boardId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Board',
		required: true,
	},
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Notes',
		required: true,
	},
});

const Notes = mongoose.model('Notes', notesSchema);
export default Notes;
