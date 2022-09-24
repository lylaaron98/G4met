var express = require('express');
var router = express.Router();

const accountsRouter = require('./@accounts.routes');
const gamersRouter = require('./@gamers.routes');
const matchesHistoryRouter = require('./@matchesHistory.routes');

/* GET home page. */
router.get('/', function(req, res, next) {

  const { userId } = req.session;

  res.render('index', { 
  
    title: 'Home',
    userId: userId

  });

});

router.use(accountsRouter);
router.use(gamersRouter);
router.use(matchesHistoryRouter);

module.exports = router;
