import express from 'express'
import session from 'express-session'
import mongoose from 'mongoose'
import MongoDBSession  from 'connect-mongodb-session'
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


app.get("/",(req,res)=>{
    //console.log(req)
    // req.session.name = "David"
    // console.log(req.session)
    res.send("Hello world session ")
})

app.listen(8000,console.log("server running on 8000"))