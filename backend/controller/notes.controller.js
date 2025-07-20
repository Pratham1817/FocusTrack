import mongoose from 'mongoose';
import Notes from '../models/notes.js';

const getNote = async (req, res) => {
	const { id } = req.params;

	// Making sure that id has the correct format for Mongo
	if (!mongoose.Types.ObjectId.isValid(id))
		return res.status(400).json({ error: "Note's id is invalid" });

	const note = await Notes.findById(id);

	if (!note) return res.status(404).json({ error: 'Note not found' });

	res.status(200).json(note);
};

const getAllNotes = async (req, res) => {
	try {
		const notes = await Notes.find({ userId: req.user.id });
		res.status(200).json(notes);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

const getPinnedNotes = async (req, res) => {
	try {
		const pinnedNotes = await Notes.find({
			userId: req.user.id,
			pinned: true,
			archived: false,
		});

		res.status(200).json(pinnedNotes);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

const getArchivedNotes = async (req, res) => {
	try {
		const archivedNotes = await Notes.find({
			userId: req.user.id,
			archived: true,
		});

		res.status(200).json(archivedNotes);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

const createNote = async (req, res) => {
	try {
		const note = await Notes.create({ userId: req.user.id, ...req.body });

		res.status(200).json(note);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

const updateNote = async (req, res) => {
	const { id } = req.params;

	if (!mongoose.Types.ObjectId.isValid(id))
		return res.status(404).json({ error: `${id} is invalid` });

	const note = await Notes.findOneAndUpdate(
		{ _id: id },
		{ ...req.body },
		{ new: true }
	);

	if (!note) return res.status(404).json({ error: 'Note not found' });
	res.status(200).json(note);
};

const updateNotesByBoardId = async (req, res) => {
	try {
		const { boardId } = req.params;
		const notes = await Notes.find({ boardId });

		for (let i = 0; i < notes.length; i++) {
			await Notes.updateOne(
				{ _id: notes[i].id },
				{
					$set: {
						title: req.body[i].title,
						description: req.body[i].description,
						priority: req.body[i].priority,
						columnTitle: req.body[i].columnTitle,
						boardId,
					},
				}
			);
		}

		res.status(200).json(notes);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

const deleteNote = async (req, res) => {
	const { id } = req.params;

	if (!mongoose.Types.ObjectId.isValid(id))
		return res.status(400).json({ error: "Note's id is invalid" });

	const note = await Notes.findOneAndDelete({ _id: id });

	if (!note) return res.status(404).json({ error: 'Note not found' });

	res.status(200).json(note);
};

export {
	getAllNotes,
	getPinnedNotes,
	getArchivedNotes,
	getNote,
	updateNotesByBoardId,
	createNote,
	updateNote,
	deleteNote,
};
