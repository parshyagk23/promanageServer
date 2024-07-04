 require("dotenv").config();
 const express = require('express')
 const mongoose = require('mongoose')
 const cors = require('cors')

 const app = express()
const authRoute = require('./routes/auth')
const taskRoute = require('./routes/task')


app.use(cors())
app.use(express.json())

const PORT = process.env.PORT;
const MONGODBURL = process.env.MONGODB_URL;

// health api

app.get("/health",(req,res)=>{
    res.json({
        status:"Active",
        time: new Date()
    })
})

// routes

app.use('/api/v1',authRoute)
app.use('/api/v1/task',taskRoute)

//  console.log('monggose',MONGODBURL)
app.listen(PORT, ()=>{
    try {
        
        mongoose.connect(MONGODBURL)
        console.log("express running")
        
    } catch (error) {
        console.log(error)
    }
 })