import mongoose from 'mongoose';

const boardSchema = new mongoose.Schema(
	{
		boardTitle: {
			type: String,
			required: true,
			trim: true,
		},
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
	},
	{
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
	}
);

boardSchema.virtual('notes', {
	ref: 'Notes',
	foreignField: 'boardId',
	localField: '_id',
});

const Board = mongoose.model('Boards', boardSchema);
export default Board;
