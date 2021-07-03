import express from 'express'
import session from 'express-session'
import mongoose from 'mongoose'
import userModel from './models/User.js'
import ejs from 'ejs'
import MongoDBSession  from 'connect-mongodb-session'
import bcrytjs from "bcryptjs"
const MYsessions = MongoDBSession(session)

var dbUrl = 'mongodb://localhost:27017/sessions'

const app = express()

//creating a store for the soring of sessions
const store = new MYsessions({
    uri:dbUrl,
    collection:"mySessions"

})





// creating the session midleware that is going to be invoked whenever
// we make a request to the server
app.use(session({
    secret:'david',// this is used to sign the all session
    resave:false,// forces the session to be resaved in the session store ev
                // even if the session was never  changed when the request was made
    saveUninitialized:false,
    store:store
}))
// by usig this middleware node creates a session body  called req.session


mongoose.connect(dbUrl,{
    useNewUrlParser :true,
    useCreateIndex:true,
    useUnifiedTopology:true
}).then(res=>console.log("Data base connected "))


app.set("view engine","ejs");
app.use(express.urlencoded({extended:true}))


app.get("/",(req,res)=>{
    //console.log(req)
     //req.session.name = "David"
    // console.log(req.session)
    res.render("landing")
})



//=================== Routes
// Login Page
app.get("/login", (req,res) =>{
    res.render("login")});

app.post("/login", async (req,res)=>{

    const {email, password}  = req.body
    // check if the user is there in the database
    const user = await userModel.findOne({email})
    if(!user){
        res.redirect('/login')
    }
    const isMatch = await bcrytjs.compare(password,user.password)

    if(!isMatch){
        res.redirect('/login')
    }
    res.redirect("/dashboard")

});

// Register Page
app.get("/register", (req,res)=>{res.render("register")});
app.post("/register", async (req,res) =>{
    const {username ,email, password} = req.body;
    let user = await userModel.findOne({email})

    if(user){
        return res.redirect('/register');
    }
    const  hashedpswd = await bcrytjs.hash(password,10)
    //create a  new user if doesnt exits
    user = new userModel({
        username,
        email,
        password:hashedpswd
    })
    await user.save()
    return res.redirect("login")

});

// Dashboard Page
app.get("/dashboard",(req,res)=>{
    res.render("dashboard")
});

// app.post("/logout", logout_post);

app.listen(8000,console.log("server running on 8000"))