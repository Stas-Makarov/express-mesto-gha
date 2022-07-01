const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send({ data: users }))
    .catch(() => res.status(500).send({ message: 'Произошлав ошибка' }));
};

module.exports.getUsersById = (req, res) => {
  User.findById(req.params.userid)
    .then((user) => {
      if (user === null) {
        res.status(404).send({ message: 'Нет пользователя с таким id' });
      }
      res.status(200).send({ data: user });
    })
    // .catch((err) => {
    //   if (err.name === 'CastError') {
    //     res.status(400).send({ message: 'Переданы некорректные данные' });
    //   } else {
    //     res.status(500).send({ message: 'Произошла ошибка' });
    //   }
    // })
    .catch(() => res.status(500).send({ message: 'Произошлав ошибка' }));
};

module.exports.createUser = (req, res) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((user) => res.status(201).send({
      message: {
        name: user.name,
        about: user.about,
        avatar: user.avatar,
        email: user.email,
      },
    }))
    .catch(() => {
      res.status(409).send({ message: 'Этот Email уже используется' });
    });
};

module.exports.updateProfile = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { runValidators: true, new: true, upsert: true },
  )
    .then((user) => {
      if (user === null) {
        res.status(404).send({ message: 'Нет пользователя с таким id' });
      }
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        res.status(400).send({
          message: 'Переданы некорректные данные при обновлении профиля',
        });
      } else {
        res.status(500).send({ message: 'Ошибка по умолчанию' });
      }
    });
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { runValidators: true, new: true },
  )
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: 'Пользователь по указанному _id не найден' });
        return;
      }
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        res.status(400).send({
          message: 'Переданы некорректные данные при обновлении аватара',
        });
      } else {
        res.status(500).send({ message: 'Ошибка по умолчанию' });
      }
    });
};

module.exports.login = (req, res) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'super-strong-secret', { expiresIn: '7d' });
      res.cookie('jwt', token, {
        httpOnly: true,
      });
      res.send({ token });
    })
    .catch(() => {
      res
        .status(401)
        .send({ message: 'Неверные почта или пароль' });
    });
};

module.exports.getCurrentUser = (req, res) => {
  User.findById(req.user._id)
    .then((user) => {
      if (user === null) {
        res.status(404).send({ message: 'Нет пользователя с таким id' });
      }
      res.status(200).send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        res.status(400).send({
          message: 'Переданы некорректные данные',
        });
      } else {
        res.status(500).send({ message: 'Ошибка по умолчанию' });
      }
    });
};
