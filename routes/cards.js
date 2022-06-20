const cardsRouter = require('express').Router();
const { getCards, createCard, deleteCard } = require('../controllers/card');

cardsRouter.get('/', getCards);
cardsRouter.post('/', createCard);
cardsRouter.delete('/:cardId', deleteCard);

module.exports = cardsRouter;
