const express = require('express');
const foodController = require('../controllers/food.controller');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware');
const multer = require('multer');

const upload = multer({
    storage: multer.memoryStorage(),
})

router.post('/',authMiddleware.authFoodPartnerMiddleware,upload.single('video'),foodController.createFood);

router.get('/', authMiddleware.authUseMiddleware, foodController.getFoodItems)

router.post('/like', authMiddleware.authFoodPartnerMiddleware, foodController.likeFood)

router.post('/save',authMiddleware.authUseMiddleware, foodController.saveFood)

router.get('/save',authMiddleware.authUseMiddleware, foodController.getSavedFood)


module.exports = router;