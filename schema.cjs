const mongoose=require('mongoose')

const resSchema=new mongoose.Schema({
    area:{
        type:String
    },
    avgRating:{
        type:Number
    },
    costForTwo:{
        type:String
    },
    cuisine:{
        type:Array
    },
    resName:{
        type:String
    }
    },
    {versionKey:false}
)

const Restaurant=mongoose.model('restaurantlist',resSchema)

// schema structure
const userSchema=new mongoose.Schema({
    email:{
        type:String,
    },
    contact:{
        type:String
    },
    password:{
        type:String,
    },
    userName:{
        type:String,
    }},
    {versionKey:false})

// schema model
const Users=mongoose.model('userDetail',userSchema)

module.exports={Restaurant,Users}