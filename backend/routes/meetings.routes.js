import express from 'express';
import {
	createMeeting,
	deleteAllMeetings,
	deleteMeeting,
	getAllMeetings,
	getUserMeetings,
	updateMeeting,
} from '../controller/meetings.controller.js';
import { isLoggedIn, protect } from '../controller/auth.controller.js';

const router = express.Router();

router
	.route('/')
	.get(protect, getAllMeetings)
	.post(createMeeting)
	.delete(deleteAllMeetings);
router
	.route('/:id')
	.get(getUserMeetings)
	.patch(updateMeeting)
	.delete(deleteMeeting);

export default router;
