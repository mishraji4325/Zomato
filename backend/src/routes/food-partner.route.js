const express = require('express');
const foodController = require('../controllers/food-partner.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const router = express.Router();

router.get('/food-partner/:id',
    authMiddleware.authUseMiddleware,foodController.getFoodPartnerById
)

module.exports = router;