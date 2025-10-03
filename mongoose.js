const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/users") // users is db name 
.then(()=>{
    console.log("MongoDB Connected");
})
.catch(()=>{
    console.log("Failed to Connect");
})

const LoginSchema = new mongoose.Schema({
    fullname:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    mobile:{
        type:Number,
        required:true
    },
})

//collection
const collection = new mongoose.model("Collection1",LoginSchema)

//expoprting collection
module.exports = collection;