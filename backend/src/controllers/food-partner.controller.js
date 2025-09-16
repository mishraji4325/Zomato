const foodPartnerModel = require('../models/foodpartner.model');
const foodModel = require('../models/food.model');

async function getFoodPartnerById(req, res){

    const foodPartner = await foodPartnerModel.findById(
        foodPartnerId
    )
    const foodItemsByFoodPartner = await foodModel.find({foodPartner:foodPartnerId})
    if(!foodPartner){
        return res.status(400).json({
            message:"food partner not found"
        })
    }
    res.status(200).json({
        message:"food partner fetched successfully",
        foodPartner:{
            ...foodPartner.toObject(),
            foodItems:foodItemsByFoodPartner
        }
    })
}

module.exports = {
    getFoodPartnerById
}