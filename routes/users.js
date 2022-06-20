const usersRouter = require('express').Router();
const {
  getUsers, createUser, getUsersById, updateProfile, updateAvatar,
} = require('../controllers/user');

usersRouter.get('/', getUsers);
usersRouter.post('/', createUser);
usersRouter.get('/:userId', getUsersById);
usersRouter.patch('/me', updateProfile);
usersRouter.patch('/me/avatar', updateAvatar);

module.exports = usersRouter;
