const mongoose=require('mongoose')
const mongoURL='mongodb://localhost:27017/hotels'
mongoose.connect(mongoURL)
const db=mongoose.connection
db.on('connected',()=>{
    console.log('connected to Mongodb server')
})
module.exports=db
