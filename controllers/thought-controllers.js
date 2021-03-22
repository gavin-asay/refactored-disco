const { User, Thought } = require('../models');

const ThoughtControllers = {
	getThoughts: async function (req, res) {
		try {
			const dbThoughtData = await Thought.find({});
			res.json(dbThoughtData);
		} catch (err) {
			console.log(err);
			res.status(500).json(err);
		}
	},

	getSingleThought: async function ({ params }, res) {
		try {
			const dbThoughtData = await Thought.findById(params.id);

			if (!dbThoughtData) {
				res.status(404).json({ message: 'No thought found with this id.' });
				return;
			}
			res.json(dbThoughtData);
		} catch (err) {
			console.log(err);
			res.status(500).json(err);
		}
	},

	createThought: async function ({ body }, res) {
		try {
			const dbThoughtData = await Thought.create(body);

			const dbUpdatedUser = await User.findByIdAndUpdate(body.userId, { $push: { thoughts: dbThoughtData._id } });

			if (!dbUpdatedUser) {
				res.status(400).json({ message: 'Expected thought owner not found.' });
				return;
			}
			res.json(dbThoughtData);
		} catch (err) {
			console.log(err);
			res.status(500).json(err);
		}
	},

	updateThought: async function ({ params, body }, res) {
		try {
			const dbThoughtData = await Thought.findByIdAndUpdate(params.id, body, { new: true, runValidators: true });

			if (!dbThoughtData) {
				res.status(400).json({ message: 'No thought found with this id.' });
				return;
			}
			res.json(dbThoughtData);
		} catch (err) {
			console.log(err);
			res.status(500).json(err);
		}
	},

	deleteThought: async function ({ params }, res) {
		try {
			const dbThoughtData = await Thought.findByIdAndDelete(params.id);
			if (!dbThoughtData) {
				res.status(400).json({ message: 'No thought found with this id.' });
				return;
			}
			const dbUpdatedUser = await User.findOneAndUpdate(
				{ username: dbThoughtData.username },
				{ $pull: { thoughts: params.id } }
			);

			res.json({ dbThoughtData, dbUpdatedUser });
		} catch (err) {
			console.log(err);
			res.status(500).json(err);
		}
	},

	createReaction: async function ({ params, body }, res) {
		try {
			const dbThoughtData = await Thought.findByIdAndUpdate(
				params.id,
				{ $push: { reactions: body } },
				{ new: true, runValidators: true }
			);

			if (!dbThoughtData) {
				res.status(400).json({ message: 'No thought found with this id.' });
				return;
			}
			res.json(dbThoughtData);
		} catch (err) {
			console.log(err);
			res.status(500).json(err);
		}
	},

	deleteReaction: async function ({ params }, res) {
		try {
			const dbThoughtData = await Thought.findByIdAndUpdate(
				params.id,
				{ $pull: { reactions: { reactionId: params.reactionId } } },
				{ new: true }
			);

			if (!dbThoughtData) {
				res.status(400).json({ message: 'No thought found with this id.' });
				return;
			}
			res.json(dbThoughtData);
		} catch (err) {
			console.log(err);
			res.status(500).json(err);
		}
	},
};

module.exports = ThoughtControllers;
