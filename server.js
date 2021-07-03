import express from 'express'
import session from 'express-session'

const app = express()



app.get("/",(req,res)=>{
    res.send("Hello world session ")
})

app.listen(8000,console.log("server running on 8000"))