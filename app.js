const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
  req.user = {
    _id: '62b067ba2f8304ad9a914662',
  };

  next();
});

app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.use('*', (_req, res) => {
  res.status(404).send({ message: 'Error 404. Страница не найдена.' });
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log('App listening on port:', PORT);
});
