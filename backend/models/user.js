import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

const userSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			required: [true, 'Username cannot be empty!'],
			trim: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
			trim: true,
			lowercase: true,
			validate: [validator.isEmail, 'Please provide a valid email!'],
		},
		password: {
			type: String,
			required: [true, 'Please provide a password!'],
			minlength: [8, 'Password must be at least 8 characters!'],
			select: false,
		},
		passwordConfirm: {
			type: String,
			required: [true, 'Please confirm your password.'],
			validate: {
				validator: function (el) {
					return el === this.password;
				},
				message: 'Passwords are not the same!',
			},
		},
		passwordChangedAt: Date,
		passwordResetToken: String,
		passwordResetExpires: Date,
	},
	{
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
	}
);

userSchema.virtual('boards', {
	ref: 'Boards',
	foreignField: 'userId',
	localField: '_id',
});

userSchema.virtual('meetings', {
	ref: 'Meeting',
	foreignField: 'userId',
	localField: '_id',
});

userSchema.virtual('notes', {
	ref: 'Notes',
	foreignField: 'userId',
	localField: '_id',
});

// Encrypting user's password persisted on the database
userSchema.pre('save', async function (next) {
	// Only run this middleware when password was actually changed
	if (!this.isModified('password')) return next();

	// Hashing password with the cost of 12
	this.password = await bcrypt.hash(this.password, 12);
	this.passwordConfirm = undefined;
	next();
});

userSchema.pre('save', function (next) {
	if (!this.isModified('password') || this.isNew) return next();

	this.passwordChangedAt = Date.now() - 1000;
	next();
});

userSchema.methods.correctPassword = async function (candidatePass, userPass) {
	return await bcrypt.compare(candidatePass, userPass);
};

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
	if (this.passwordChangedAt) {
		const changedTimestamp = parseInt(
			this.passwordChangedAt.getTime() / 1000,
			10
		);

		return JWTTimestamp < changedTimestamp;
	}
	return false;
};

userSchema.methods.createPasswordResetToken = function () {
	const resetToken = crypto.randomBytes(32).toString('hex');

	this.passwordResetToken = crypto
		.createHash('sha256')
		.update(resetToken)
		.digest('hex');

	this.passwordResetExpires = Date.now() + 10 * 60 * 1000; // works for 10mins (in milliseconds)

	return resetToken;
};

const User = mongoose.model('User', userSchema);
export default User;
