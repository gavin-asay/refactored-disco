const {
	getUsers,
	getSingleUser,
	createUser,
	updateUser,
	deleteUser,
	addFriend,
	deleteFriend,
} = require('../../controllers/user-controllers');

const router = require('express').Router();

router.route('/').get(getUsers).post(createUser);
router.route('/:id').get(getSingleUser).put(updateUser).delete(deleteUser);
router.route('/:id/friends/:friendId').post(addFriend).delete(deleteFriend);

module.exports = router;
