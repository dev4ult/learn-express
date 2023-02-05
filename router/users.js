const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.route('/users').get(userController.index).post(userController.add);

router.get('/users/detail/:uid', userController.detail);

router.get('/users/form_add', userController.form_add);
router.put('/users/:userId', userController.update);

router.delete('/users/:uid', userController.delete);

module.exports = router;
