const usersRouter = require('express').Router();
const {
  getUsers, createUser, getUsersById, updateProfile, updateAvatar, getCurrentUser,
} = require('../controllers/user');

usersRouter.get('/', getUsers);
usersRouter.get('/me', getCurrentUser);
usersRouter.get('/:userId', getUsersById);
usersRouter.post('/', createUser);
usersRouter.patch('/me', updateProfile);
usersRouter.patch('/me/avatar', updateAvatar);

module.exports = usersRouter;
