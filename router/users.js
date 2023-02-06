const express = require('express');
const router = express.Router();
const userController = require('../controllers/user_c');

router.get('/users/form_add', userController.form_add);

router.route('/users').get(userController.index).post(userController.add).delete(userController.delete);
router.get('/users/detail/:id', userController.detail);
router.put('/users/detail', userController.update);

module.exports = router;
