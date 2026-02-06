const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

router.get('/:userId', orderController.getOrders);
router.post('/', orderController.createOrder);

module.exports = router;
