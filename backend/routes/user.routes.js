import express from 'express';
import {
	deleteUser,
	getAllUsers,
	getMe,
	getUser,
	updateMe,
	updateUser,
} from '../controller/user.controller.js';
import {
	forgotPassword,
	login,
	logout,
	protect,
	resetPassword,
	signUp,
	updatePassword,
} from '../controller/auth.controller.js';
const router = express.Router();

router.route('/signup').post(signUp);
router.route('/login').post(login);
router.route('/logout').get(logout);
router.route('/forgotPassword').post(forgotPassword);
router.route('/resetPassword/:token').patch(resetPassword);

router.use(protect);
router.route('/updatePassword').patch(updatePassword);
router.route('/updateMe').patch(updateMe);
router.route('/me').get(getMe, getUser);

router.route('/').get(getAllUsers);
router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

export default router;
