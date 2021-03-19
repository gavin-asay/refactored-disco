const { getUsers, getSingleUser, createUser, updateUser, deleteUser } = require('../../controllers/user-controllers');
const router = require('express').Router();

router.route('/').get(getUsers).post(createUser);
router.route('/:id').get(getSingleUser).put(updateUser).delete(deleteUser);

module.exports = router;
