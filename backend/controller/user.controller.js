import User from '../models/user.js';

const getAllUsers = async (req, res) => {
	try {
		const users = await User.find().populate('boards');
		res.status(200).json(users);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

const getMe = (req, res, next) => {
	req.params.id = req.user.id;
	next();
};

const getUser = async (req, res) => {
	try {
		if (!req.params.id) return;

		const user = await User.findById(req.params.id)
			.populate('boards')
			.populate('notes')
			.select('+password');

		if (!user)
			res.status(404).json({
				error: `Couldn't find any user with this id: ${req.params.id}`,
			});

		res.status(200).json(user);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

const updateUser = async (req, res) => {
	try {
		const { id } = req.params;
		const user = await User.findByIdAndUpdate(id, req.body, {
			new: true,
		});

		if (!user)
			res
				.status(404)
				.json({ error: `Couldn't find any user with this id: ${id}` });

		res.status(200).json(user);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

const deleteUser = async (req, res) => {
	try {
		const { id } = req.params;
		const user = await User.findByIdAndDelete(id);

		if (!user)
			res
				.status(404)
				.json({ error: `Couldn't find any user with this id: ${id}` });

		res.status(200).json(user);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

const updateMe = async (req, res) => {
	if (req.body.password || req.body.passwordConfirm)
		return res.status(400).json({
			error:
				'This route is not for password updates. Please use /updatePassword',
		});

	if (!req.body.username || !req.body.email)
		return res.status(404).json({ error: 'Both fields are required!' });
	try {
		const updatedUser = await User.findByIdAndUpdate(req.user.id, req.body, {
			new: true,
			runValidators: true,
		});

		res.status(200).json({ updatedUser });
	} catch (err) {
		if (err.code === 11000)
			return res
				.status(400)
				.json({ error: 'There is already a user with this e-mail!' });
		res.status(400).json({ error: err.message });
	}
};

export {
	getAllUsers,
	getUser,
	updateUser,
	deleteUser,
	updateMe,
	getMe,
};
