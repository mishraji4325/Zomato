const userModel = require('../models/user.model');
const foodPartnerModel = require('../models/foodpartner.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function registerUser(req, res){

    const { fullName, email, password} =req.body;

    const isUserAlreadyExists = await userModel.findOne({
        email
    })

    if (isUserAlreadyExists){
        return res.status(400).json({
            message:'user already exists'
        })
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
        fullName,
        email,
        password:hashedPassword
    })

    const token = jwt.sign({
        id:user._id,
    }, process.env.JWT_SECRET)
    
    res.cookie('token', token)

    res.status(201).json({
        message:"user registered successfully",
        user:{
            _id:user._id,
            email:user.email,
            fullName:user.fullName
        }
    })
}


async function loginUser (req, res){
    const { email , password} = req.body;
    const user = await userModel.findOne({
        email
    })
    if (!user){
        return res.status(400).json({
            message:'invalid email or password'
        })
    }

   const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        return res.status(400).json({
            message: "Invalid email or password"
        })
    }

    const token = jwt.sign({
        id: user._id,
    }, process.env.JWT_SECRET)

    res.cookie("token", token)

    res.status(200).json({
        message: "User logged in successfully",
        user: {
            _id: user._id,
            email: user.email,
            fullName: user.fullName
        }
    })
}

async function logoutUser(req, res){
    res.clearCookie('token');
    res.status(200).json({
        message:'User logged out successfully'
    })
}


async function registerFoodPartner(req, res){
    const {name, email, password,phone, address, contactName} = req.body;

    const idFoodPartnerAlreadyExists = await foodPartnerModel.findOne({
        email
    })
    if (idFoodPartnerAlreadyExists){
        return res.status(400).json({
            message:"food partner already exists"
        })


  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const foodPartner = await foodPartnerModel.create({
    name,
    email, 
    phone,
    address,
    contactName,
    password:hashedPassword
  })

  const token = jwt.sign({
    id:foodPartner._id,
  }, process.env.JWT_SECRET)

  res.cookie('token', token)

  res.status(201).json({
    message:"you are now a food partner",
    foodPartner:{
        _id:foodPartner._id,
        email:foodPartner.email,
        name:foodPartner.name,
        contactName:foodPartner.contactName,
        phone:foodPartner.phone,
        address:foodPartner.address
    }
  })


}

async function loginFoodPartner(req, res){
    const {email, password}= req.body;

    const foodPartner = await foodPartnerModel.findOne({
        email
    })
    if(!foodPartner){
        return res.status(400).json({
            message:"invalid email or password"
        })
    }

    const isPasswordValid = await bcrypt.compare(password, foodPartner.password);

    if(!isPasswordValid){
        return res.status(400).json({
            message:"invalid or email or password"
        })
    }

    const token = jwt.sign({
        id:foodPartner._id,
    },process.env.JWT_SECRET)

    res.cookie('token', token)

    res.status(200).json({
        message:"food partner logged in successfully",
        foodPartner:{
            _id:foodPartner._id,
            email:foodPartner.email,
            name:foodPartner.name
        }
    })
}

function logoutFoodPartner(req, res){
    res.clearCookie('token');
    res.status(200).json({
        message:"food partner logged out successfully"
    })
}

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    registerFoodPartner,
    loginFoodPartner,
    logoutFoodPartner
}