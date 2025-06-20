const express=require('express')
const router=express.Router()
const MenuItem=require('./../models/Menu')
const roleauth=require('./../roleauth')
const {jwtAuthMiddleware,generateToken}=require('./../jwt')
router.post('/',jwtAuthMiddleware,roleauth('manager'),async (req,res)=>{
    try{
        const data=req.body
        const newMenu=new MenuItem(data)
        const response=await newMenu.save()
        res.status(200).json(response)

    }catch(err){
        console.log(err)
        res.status(500).json({err:'internal server error'})

    }
})
router.get('/',async (req,res)=>{
    try{
        const data=await MenuItem.find()
        res.status(200).json(data)

    }catch(err){
        console.log(err)
        res.status(500).json({err:'internal server error'})
    }
})

router.get('/:category',async (req,res)=>{
    try{
        category=req.params.category
        if(category=='starter'||category=='main course'||category=='dessert'||category=='beverage'){
            const response=await MenuItem.find({category:category})
            res.status(200).json(response)
        }
        else{
            res.status(404).json({error:'invalid category'})
        }


    }catch(err){
        console.log(err)
        res.status(500).json({err:'internal server error'})
    }
})
router.put('/:id',jwtAuthMiddleware,roleauth('manager'),async (req,res)=>{
    try{
        const id=req.params.id
        const updatedata=req.body
        const response=await MenuItem.findByIdAndUpdate(id,updatedata,{
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
router.delete('/:id',jwtAuthMiddleware,roleauth('manager'),async (req,res)=>{
    try{
    const id=req.params.id
    const response=await MenuItem.findByIdAndDelete(id)
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

