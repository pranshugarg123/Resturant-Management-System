const express=require('express')
const app=express()
const db=require('./db')
const Person=require('./models/Person')
const bodyParser=require('body-parser')
const passport=require('./auth')
app.use(bodyParser.json())
require('dotenv').config();
const logRequest=(req,res,next)=>{
    console.log(`[${new Date().toLocaleString()}]Request made to:${req.originalUrl}`)
    next()
}//middleware
//app.use(logRequest)

app.use(passport.initialize())
const localAuthMiddleware=passport.authenticate('local',{session:false})
app.get('/',localAuthMiddleware,(req,res)=>{
    res.send('Welcome to the hotel')
})
const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`)
})
const personRoutes=require('./routes/personRoutes')
app.use('/person',personRoutes)
const menuRoutes=require('./routes/menuItemRoutes')
app.use('/menu',menuRoutes)


