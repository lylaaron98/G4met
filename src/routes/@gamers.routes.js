const express = require('express');

const authMiddleware = require('../middlewares/@auth.middleware');
const GamerController = require('../services/gamers/@gamers.controller');

const gamersRouter = express.Router();

const gamerController = new GamerController();

gamersRouter.get('/gamers/dashboard',authMiddleware.redirectLogin,gamerController.gamer_dashboard_get);

gamersRouter.get('/gamers/profile',authMiddleware.redirectLogin,gamerController.gamer_profile_get);

gamersRouter.get('/gamers/profile/edit',authMiddleware.redirectLogin,gamerController.gamer_profile_edit_get);

gamersRouter.get('/gamers/:username',authMiddleware.redirectLogin,gamerController.gamer_profile_view_get);

gamersRouter.get('/gamers/requests/friends_pending',authMiddleware.redirectLogin,gamerController.gamer_requests_pending_get);

gamersRouter.get('/gamers/requests/sent',authMiddleware.redirectLogin,gamerController.gamer_requests_sent_get);

gamersRouter.post('/gamers/profile/edit',gamerController.gamer_profile_edit_post);

gamersRouter.post('/gamers/requests/create',gamerController.gamer_requests_create_post);

gamersRouter.post('/gamers/requests/delete',gamerController.gamer_requests_delete_post);

module.exports = gamersRouter;