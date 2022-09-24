const express = require('express');
const authMiddleware = require('../middlewares/@auth.middleware');
const AccountController = require('../services/accounts/@accounts.controller');

const accountsRouter = express.Router();

const accountController = new AccountController();

accountsRouter.get('/signup',authMiddleware.redirectUserDashboard,accountController.signup_get);

accountsRouter.get('/signin',authMiddleware.redirectUserDashboard,accountController.login_get);

accountsRouter.get('/logout',authMiddleware.redirectLogin,accountController.logout_get);

accountsRouter.post('/signup',accountController.signup_post);

accountsRouter.post('/login',accountController.login_post);

module.exports = accountsRouter;