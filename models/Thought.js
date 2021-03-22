const { Schema, model, Types } = require('mongoose');
const dayjs = require('dayjs');

const ReactionSchema = new Schema(
	{
		reactionId: {
			type: Schema.Types.ObjectId,
			default: () => new Types.ObjectId(),
		},
		reactionBody: {
			type: String,
			required: true,
			min: 1,
			max: 280,
		},
		username: {
			type: String,
			required: true,
		},
		createdAt: {
			type: Date,
			default: Date.now,
		},
	},
	{
		_id: false,
	}
);

const ThoughtSchema = new Schema(
	{
		thoughtText: {
			type: String,
			required: 'Thought must be between 1 and 280 characters long.',
			min: 1,
			max: 280,
		},
		createdAt: {
			type: Date,
			default: Date.now,
		},
		username: {
			type: String,
			required: true,
		},
		reactions: [ReactionSchema],
	},
	{
		toJSON: {
			virtuals: true,
			getters: true,
		},
		id: false,
	}
);

const getTimestamp = () => {
	return dayjs(this.createdAt).format('MMM DD, YYYY at h:mm A');
};

ReactionSchema.virtual('timestamp').get(getTimestamp);
ThoughtSchema.virtual('timestamp').get(getTimestamp);

const Thought = model('Thoughts', ThoughtSchema);

module.exports = Thought;
