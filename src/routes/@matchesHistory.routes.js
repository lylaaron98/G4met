const express = require('express');

const authMiddleware = require('../middlewares/@auth.middleware');

const MatchesHistoryController = require('../services/matchesHistorySystem/@matchesHistory.controller');

const matchesHistoryRouter = express.Router();

const matchesHistoryController = new MatchesHistoryController();

matchesHistoryRouter.get('/gamers/matches/my_matches',authMiddleware.redirectLogin,matchesHistoryController.gamer_matches_get);

matchesHistoryRouter.get('/gamers/matches/suggestions',authMiddleware.redirectLogin,matchesHistoryController.gamer_matches_suggestions_get);

matchesHistoryRouter.post('/gamers/matches/create',matchesHistoryController.gamer_matches_create_post);

matchesHistoryRouter.post('/gamers/matches/delete',matchesHistoryController.gamer_matches_delete_post);

module.exports = matchesHistoryRouter;