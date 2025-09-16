const mongoose = require('mongoose');


function connectDb(){
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log('Mongodb connected');
    })
    .catch((err)=>{
        console.log(err);
    })
}


module.exports = connectDb;