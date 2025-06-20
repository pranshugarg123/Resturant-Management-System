const express=require('express')
const router=express.Router()
const Person=require('../models/Person')
const {jwtAuthMiddleware,generateToken}=require('./../jwt')
const passport=require('../auth')
const roleAuth=require('../roleauth')
const localAuthMiddleware=passport.authenticate('local',{session:false})
router.post('/signup',async (req,res)=>{
    try{
        const data=req.body
        const newPerson=new Person(data)
        const response=await newPerson.save()
        console.log('data saved')
        const payload={
            id:response.id,
            username:response.username,
            role:response.work
        }
        const token=generateToken(payload)
        res.status(200).json({response:response,token:token})

    }catch(err){
        console.log(err)
        res.status(500).json({err:'internal server error'})

    }
})

//login route
router.post('/login',async (req,res)=>{
    try{
        //extract username and password from body
        const {username,password}=req.body
        const user=await Person.findOne({username:username})
        //if user doesnt exist or password return error
        if(!user||!(await user.comparePassword(password))){
            return res.status(401).json({error:'invalid username or password'})
        }
        //generate token
        const payload={
            id:user.id,
            username:user.username,
            role:user.work
        }
        const token=generateToken(payload)
        res.json({token})

    }catch(err){
        console.log(err)
        res.status(500).json({err:'internal server error'})
    }
})
//profile route
router.get('/profile',jwtAuthMiddleware,async (req,res)=>{
    try{
        const userData=req.user
        const userId=userData.id
        const user=await Person.findById(userId)
        res.status(200).json({user})

    }catch(err){
        console.log(err)
        res.status(500).json({err:'internal server error'})

    }
})
router.get('/',jwtAuthMiddleware,async (req,res)=>{
    try{
        const data=await Person.find()
        res.status(200).json(data)

    }catch(err){
        console.log(err)
        res.status(500).json({err:'internal server error'})
    }
})


router.get('/:workType',jwtAuthMiddleware,async (req,res)=>{
   try{
    const workType=req.params.workType
    if(workType=='chef'||workType=='manager'||workType=='waiter'){
        const response=await Person.find({work:workType})
        res.status(200).json(response)
    }
    else{
        res.status(404).json({error:'invalid work type'})
    }

   }catch(err){
    console.log(err)
        res.status(500).json({err:'internal server error'})
   }
})
router.put('/:id',jwtAuthMiddleware,roleAuth('manager','self'),async (req,res)=>{
    try{
        const id=req.params.id
        const updatedata=req.body
        const response=await Person.findByIdAndUpdate(id,updatedata,{
            new:true,//return the updated document
            runValidators:true,//run mongoose validation
        })
        if(!response){
             return res.status(404).json({error:'Person not found'})
        }
        res.status(200).json(response)

    }catch(err){
        console.log(err)
        res.status(500).json({err:'internal server error'})
    }
})
router.delete('/:id',jwtAuthMiddleware,roleAuth('manager','self'),async (req,res)=>{
    try{
    const id=req.params.id
    const response=await Person.findByIdAndDelete(id)
    if(!response){
        return res.status(404).json({error:'Person not found'})
   }
   res.status(200).json(response)
    }catch(err){
        console.log(err)
        res.status(500).json({err:'internal server error'})
    }

})

module.exports=router

