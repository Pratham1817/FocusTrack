import express from 'express';
import {
	getAllBoards,
	createBoard,
	getBoard,
	deleteBoard,
	getUserBoards,
} from '../controller/boards.controller.js';
import { protect } from '../controller/auth.controller.js';

const router = express.Router();

router.route('/').get(protect, getAllBoards);
router.route('/:userId').get(getUserBoards).post(createBoard);
router.route('/board/:id').get(getBoard).delete(deleteBoard);

export default router;
