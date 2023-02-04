const express = require('express');
const app = express();
const router = express.Router();
const userController = require('../controllers/userController');

const logParams = (req, res, next) => {
  console.log(req.params);
  next();
};

router.route('/users').get(userController.index).post(userController.add);

router.use(logParams);
router.put('/users/:userId', userController.update);

router.delete('/users/:uid', userController.delete);

module.exports = router;
