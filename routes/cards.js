const cardsRouter = require('express').Router();
const { getCards, createCard, deleteCard } = require('../controllers/card');

cardsRouter.get('/cards', getCards);
cardsRouter.post('/cards', createCard);
cardsRouter.delete('/cards/:cardId', deleteCard);

module.exports = cardsRouter;