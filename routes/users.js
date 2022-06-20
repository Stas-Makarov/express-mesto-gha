const usersRouter = require('express').Router();
const { getUsers, createUser, getUsersById } = require('../controllers/user');

usersRouter.get('/', getUsers);
usersRouter.get('/:userId', getUsersById);
usersRouter.post('/', createUser);

module.exports = usersRouter;
