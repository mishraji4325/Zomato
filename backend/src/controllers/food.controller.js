const foodModel = require('../models/fooditem.model');
const storageService = require('../services/storage.service');
const likesModel = require('../models/likes.model')
const {v4:uuid} = require('uuid');
const likesModel = require('../models/likes.model');
const saveModel = require('../models/save.model');

async function  createFood(req, res){
    const fileUploadResult = await storageService.uploadFile(req.file.buffer, uuid())

    const foodItem = await foodModel.create({
        name:req.body.name,
        description:req.body.description,
        video:fileUploadResult.url,
        foodPartner:req.foodPartner._id
    })
    res.status(201).json({
        message:"food item created successfully",
        food:foodItem
    })
}

async function getFoodItems(req, res){
    const foodItems = await foodModel.find({})
        res.status(200).json({
            message:"food items fetched successfully",
            foodItems
        
    })
}

async function likeFood(req, res){
    const {foodId} = req.body
    const user= req.user

    const isAlreadyLiked = await likesModel.findOne({user:user._id,food:foodId})
    
    if(isAlreadyLiked){
        await likesModel.deleteOne({user:user._id,food:foodId})

        await foodModel.findByIdAndUpdate(foodId,{
            $inc:{
                likeCount:-1
            }
        })


        return res.status(400).json({
            message:"food already liked"
        })
    }
   
    const like = await likesModel.create({
        user:user._id,
        food:foodId
    })

    await foodModel.findByIdAndUpdate(foodId,{
        $inc:{likeCount:-1}
    })


    res.status(201).json({
        message:"food liked successfully",
        like
    })
}

async function saveFood(req, res){

    const {foodId}= req.body;
    const user = req.user;

    const isAlreadySaved = await saveModel.findOne({
        user:user._id,
        food:foodId
    })
    if(isAlreadySaved){
        await foodModel.deleteOne({
            user:user._id,
            food:foodId
        })

        await foodModel.findByIdAndUpdate(foodId,{
            $inc:{saveCount:-1}
        })
        return res.status(400).json({
            message:"food already saved"
        })
    }
    const save = await saveModel.create({
        user:user._id,
        food:foodId
    })
    res.status(201).json({
        message:"food saved successfully",
        save
    })
}

async function getSavedFood(req,res){
    const user = req.user;

    const saveFoods = await saveModel.find({
        user:user._id
    }).populate('food');

    if(!saveFood || saveFoods.length ===0){
        return res.status(400).json({
            message:"no food saved"
        })
    }
    res.status(200).json({
        message:" saved food fetched successfully",
        saveFoods
    })
}

module.exports = {
    createFood,
    getFoodItems,
    likeFood,
    saveFood,
    getSavedFood
}