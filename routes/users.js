const usersRouter = require('express').Router();
const { getUsers, createUser, getUsersById } = require('../controllers/user');

usersRouter.get('/users', getUsers);
usersRouter.get('/users/:userId', getUsersById);
usersRouter.post('/users', createUser);

module.exports = usersRouter;