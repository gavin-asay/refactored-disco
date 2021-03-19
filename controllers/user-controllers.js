const { User, Thought } = require('../models');

const UserControllers = {
	getUsers: async function (req, res) {
		try {
			const dbUserData = await User.find({});

			if (!dbUserData || !dbUserData.length) {
				res.status(404).json({ message: 'No users found.' });
				return;
			}
			res.json(dbUserData);
		} catch (err) {
			console.log(err);
			res.status(500).json(err);
		}
	},

	getSingleUser: async function ({ params }, res) {
		try {
			console.log(params.id);
			const dbUserData = await User.findById(params.id)
				.populate({ path: 'Thought', select: '-createdAt' })
				.populate({ path: 'User' }); // since we have a formatted timestamp getter, don't also include raw createdAt date

			if (!dbUserData) {
				res.status(404).json({ message: 'No user found with this id.' });
				return;
			}
			res.json(dbUserData);
		} catch (err) {
			console.log(err);
			res.status(500).json(err);
		}
	},

	createUser: async function ({ body }, res) {
		try {
			res.json(await User.create(body));
		} catch (err) {
			console.log(err);
			res.status(500).json(err);
		}
	},

	updateUser: async function ({ params, body }, res) {
		try {
			const dbUserData = await User.findByIdAndUpdate(params.id, body, { new: true, runValidator: true });

			if (!dbUserData) {
				res.status(404).json({ message: 'No user found with this id.' });
				return;
			}
			res.json(dbUserData);
		} catch (err) {
			console.log(err);
			res.status(500).json(err);
		}
	},

	deleteUser: async function ({ params }, res) {
		try {
			const dbUserData = await User.findByIdAndDelete(params.id);

			if (!dbUserData) {
				res.status(404).json({ message: 'No user found with this id.' });
				return;
			}
			res.json(dbUserData);
		} catch (err) {
			console.log(err);
			res.status(500).json(err);
		}
	},
};

module.exports = UserControllers;