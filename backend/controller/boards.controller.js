import mongoose from 'mongoose';
import Board from '../models/board.js';
import Notes from '../models/notes.js';

const getAllBoards = async (req, res) => {
	try {
		const boards = await Board.find().populate('notes');
		res.status(200).json(boards);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

const getBoard = async (req, res) => {
	const { id } = req.params;

	if (!mongoose.Types.ObjectId.isValid)
		return res.status(400).json({ error: "Board's id is invalid" });

	try {
		const board = await Board.findById(id).populate('notes');

		if (!board) {
			return res.status(404).json({ error: 'Board not found' });
		}

		res.status(200).json(board.notes);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

const getUserBoards = async (req, res) => {
	const { userId } = req.params;

	if (!mongoose.Types.ObjectId.isValid)
		return res.status(400).json({ error: "Board's id is invalid" });

	try {
		const boards = await Board.find({ userId });

		if (!boards) {
			return res.status(404).json({ error: 'Board not found' });
		}

		res.status(200).json(boards);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

const createBoard = async (req, res) => {
	try {
		const { userId } = req.params;
		const board = await Board.create({ ...req.body, userId });
		
		res.status(200).json(board);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

const deleteBoard = async (req, res) => {
	try {
		const { id } = req.params;
		const board = await Board.findByIdAndDelete(id);

		// Delete all notes of the recently deleted board
		await Notes.deleteMany({ boardId: id });

		if (!mongoose.Types.ObjectId.isValid)
			return res.status(400).json({
				error: "Board's id is invalid",
			});

		res.status(200).json(board);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

export { getAllBoards, getUserBoards, getBoard, createBoard, deleteBoard };
