import mongoose from 'mongoose'
const Schema = mongoose.Schema
const userSchema = mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
})

var user = mongoose.model("User",userSchema)

export default user