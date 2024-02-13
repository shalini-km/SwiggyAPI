const bodyParser=require('body-parser')
const express=require('express')
const mongoose=require('mongoose')
const cors=require('cors')


const {Restaurant}=require('./schema.cjs')
const {Users}=require('./schema.cjs')


const app=express()
app.use(bodyParser.json())
app.use(cors())

const port=process.env.PORT || 7000

async function connectToDb(){
    try{
        await mongoose.connect('mongodb+srv://Shalinikm:Shalini7103@shalini.euekleq.mongodb.net/Swiggy?retryWrites=true&w=majority')
        console.log("connection established")
        app.listen(port,function(){
            console.log(`listening on ${port}`)
        })
    }
    catch(error){
        console.log(error)
        console.log("failed to connect")
    }

}

app.post('/add-restaurant',async function(request,response){
    try{
        await Restaurant.create({
        "area": request.body.area,
        "avgRating":request.body.avgRating,
        "costForTwo":request.body.costForTwo,
        "cuisine":request.body.cuisine,
        "resName":request.body.resName

    })
    response.status(201).json({
        "status":"Restaurant Added"
    })
    // response.status(500).json({
    //     "status":"Internal Server Error"
    // })
    }
    catch(error){
        console.log(error)
    }
})

app.get('/get-restaurant-details', async function(request,response){
    try{
        const restaurantDetails=await Restaurant.find()
        response.status(200).json(restaurantDetails)
}
    catch(error){
        response.status(500).json({
            "status":"failure",
            "message":"could not fetch",
            "error":error
        })
    }
})

app.post('/create-new-user', async function(request,response){
    try{
        await Users.create({
            "userName":request.body.userName,
            "email":request.body.email,
            "password":request.body.password,
            "contact":request.body.contact

        })
        response.status(201).json({
            "status":"success"
        })
    }
    catch(error){
        response.status(500).json({
            "status":"user not created",
            "Error":"internal server Error"
        })
    }
})

app.post('/validate-user',async function(request,response){
    try {
        const user= await Users.findOne({
            "email":request.body.email,
            "password":request.body.password
        })
        if(user){
            response.status(200).json({
                "message":"Valid user"
            })
        }  
        else{
            response.status(401).json({
                "message":"Invalid user"
            })
        }    
    }
    catch(error){
        response.status(500).json({
            error:"Internal Server Error"
        })
    }
})


connectToDb()