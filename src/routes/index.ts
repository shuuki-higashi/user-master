import * as Express from 'express';

const router = Express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  // router.get('/', function(req, res, next) {
  res.send('index');
});

module.exports = router;
