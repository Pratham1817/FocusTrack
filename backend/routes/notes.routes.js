import express from 'express';
import {
	createNote,
	deleteNote,
	getAllNotes,
	getPinnedNotes,
	getNote,
	updateNote,
	updateNotesByBoardId,
	getArchivedNotes,
} from '../controller/notes.controller.js';
import { isLoggedIn, protect } from '../controller/auth.controller.js';

const router = express.Router();

router.route('/').get(protect, getAllNotes).post(isLoggedIn, createNote);
router.route('/pinned').get(isLoggedIn, getPinnedNotes);
router.route('/archived').get(isLoggedIn, getArchivedNotes);
router.route('/:id').get(getNote).patch(updateNote).delete(deleteNote);
router.route('/:boardId').put(updateNotesByBoardId);

export default router;
