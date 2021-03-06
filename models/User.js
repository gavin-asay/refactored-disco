const { Schema, model } = require('mongoose');

const UserSchema = new Schema(
	{
		username: {
			type: String,
			unique: true,
			required: 'Username is required.',
			trim: true,
		},
		email: {
			type: String,
			unique: true,
			required: 'Email address is required.',
			match: /^[\w\d!#$%&'*+\-\/=?^_`{|}~\.]{1,64}@[A-Za-z0-9\-]+\.\w{2,6}$/,
			trim: true,
		},
		thoughts: [
			{
				type: Schema.Types.ObjectId,
				ref: 'Thoughts',
			},
		],
		friends: [
			{
				type: Schema.Types.ObjectId,
				ref: 'Users',
			},
		],
	},
	{
		toJSON: {
			virtuals: true,
			getters: true,
		},
		id: false,
	}
);

UserSchema.virtual('thoughtCount').get(function () {
	return this.thoughts.length;
});
UserSchema.virtual('friendCount').get(function () {
	return this.friends.length;
});

const User = model('Users', UserSchema);

module.exports = User;
