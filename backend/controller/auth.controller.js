import User from '../models/user.js';
import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import { sendEmail } from '../utils/helpers.js';
import crypto from 'crypto';
import mongoose from 'mongoose';

const signToken = (id) =>
	jwt.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRES_IN,
	});

const createSendToken = (user, statusCode, res) => {
	const token = signToken(user._id);

	const cookieOptions = {
		expires: new Date(
			Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
		),
		secure: true,
		httpOnly: true,
		sameSite: 'strict',
	};
	res.cookie('jwt', token, cookieOptions);

	user.password = undefined;

	res.status(statusCode).json({
		token,
		user,
	});
};

const login = async (req, res) => {
	const { email, password } = req.body;

	try {
		if (!email || !password)
			return res
				.status(404)
				.json({ error: 'Email or password could not be found' });

		const user = await User.findOne({ email }).select('+password');

		if (!user || !(await user.correctPassword(password, user.password)))
			return res.status(401).json({ error: 'Incorrect email or password!' });

		createSendToken(user, 200, res);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

const signUp = async (req, res) => {
	try {
		const newUser = await User.create({
			username: req.body.username,
			email: req.body.email,
			password: req.body.password,
			passwordConfirm: req.body.passwordConfirm,
			passwordChangedAt: req.body.passwordChangedAt,
		});

		createSendToken(newUser, 201, res);
	} catch (err) {
			console.error("Signup Error:", err); // ← Add this

		// Catching duplicate key error for email field
		if (err.code === 11000) {
			return res
				.status(400)
				.json({ error: 'This email already has an account!' });
		}

		// Catching fields' validation errors
		if (err instanceof mongoose.Error.ValidationError) {
			const errField = Object.keys(err.errors)[0];
			return res.status(400).json({ error: err.errors[errField].message });
		}
		res.status(500).json({ error: err.message });
	}
};

const logout = (req, res) => {
	res.cookie('jwt', 'dummy-text', {
		expires: new Date(Date.now() + 10 * 1000),
		httpOnly: true,
	});
	res.status(200).json({ message: 'Logged out successfully' });
};

const protect = async (req, res, next) => {
	let token;
	try {
		if (
			req.headers.authorization &&
			req.headers.authorization.startsWith('Bearer')
		) {
			token = req.headers.authorization.split(' ')[1];
		} else if (req.cookies.jwt) {
			token = req.cookies.jwt;
		}

		if (!token)
			return res
				.status(401)
				.json({ error: 'You are not logged in! Please login to get access.' });

		const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

		// Checking if user still exists
		const user = await User.findById(decoded.id);

		if (!user)
			return res.status(401).json({
				error: 'The user belonging to this token does no longer exist',
			});

		// Checking if user changed password after the token was issued
		if (user.changedPasswordAfter(decoded.iat))
			return res
				.status(401)
				.json({ error: 'User recently changed password! Please log in again' });

		// Grant access to user
		req.user = user;
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
	next();
};

const isLoggedIn = async (req, res, next) => {
	try {
		if (req.cookies.jwt) {
			// Verify token
			const decoded = await promisify(jwt.verify)(
				req.cookies.jwt,
				process.env.JWT_SECRET
			);

			// Checking if user still exists
			const user = await User.findById(decoded.id);

			if (!user) return next();

			// Checking if user changed password after the token was issued
			if (user.changedPasswordAfter(decoded.iat)) return next();

			// There is a logged in user
			req.user = user;
		}
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
	next();
};

const forgotPassword = async (req, res) => {
	const user = await User.findOne({ email: req.body.email });

	if (!user)
		return res
			.status(404)
			.json({ error: 'There is not a user with this email address!' });

	// Generate the random reset token
	const resetToken = user.createPasswordResetToken();
	await user.save({ validateBeforeSave: false });

	try {
		await sendEmail(user, resetToken);

		res
			.status(200)
			.json({ message: 'Security code sent to e-mail! Be sure to check your spam folder.', resetToken });
	} catch (err) {
		user.passwordResetToken = undefined;
		user.passwordResetExpires = undefined;

		await user.save({ validateBeforeSave: false });

		res.status(500).json({
			error: 'There was an error sending this email! Try again later.',
		});
	}
};

const resetPassword = async (req, res, next) => {
	try {
		// Get user based on the token
		const hashedToken = crypto
			.createHash('sha256')
			.update(req.params.token)
			.digest('hex');

		const user = await User.findOne({
			passwordResetToken: hashedToken,
			passwordResetExpires: { $gt: Date.now() },
		});

		// If token hasn't expired and there is user, set the new password
		if (!user)
			return res
				.status(400)
				.json({ error: 'Security code is invalid or has expired' });

		if (req.body.password !== req.body.passwordConfirm)
			return res.status(400).json({ error: 'Passwords are not the same!' });

		user.password = req.body.password;
		user.passwordConfirm = req.body.passwordConfirm;
		user.passwordResetToken = undefined;
		user.passwordResetExpires = undefined;
		await user.save();

		res.status(200).json({
			message:
				'Your password has been successfully updated! Log in again to get access.',
		});
	} catch (err) {
		res.status(400).json({ error: err.errors.password.message });
	}
};

const updatePassword = async (req, res, next) => {
	try {
		const user = await User.findById(req.user.id).select('+password');

		// Check if posted current password is correct
		if (!(await user.correctPassword(req.body.passwordCurrent, user.password)))
			return res.status(401).json({ error: 'Your current password is wrong.' });

		if (req.body.password !== req.body.passwordConfirm)
			return res.status(400).json({
				error: 'The new password and confirmation password do not match!',
			});

		if (req.body.passwordCurrent === req.body.password)
			return res
				.status(400)
				.json({ error: 'Current password is the same with new password.' });

		// If so, update password
		user.password = req.body.password;
		user.passwordConfirm = req.body.passwordConfirm;
		await user.save();

		// Log in user and send JWT
		createSendToken(user, 200, res);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

export {
	signUp,
	login,
	logout,
	protect,
	isLoggedIn,
	forgotPassword,
	resetPassword,
	updatePassword,
};
