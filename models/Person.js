const mongoose=require('mongoose')
const bcrypt=require('bcrypt')
const personShema=new mongoose.Schema({
    name:{
        type:String,
        equired:true
    },
    age:{
        type:Number
    },
    work:{
        type:String,
        enum:["chef","waiter","manager"],
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    salary:{
        type:Number,
        required:true
    },
    username:{
        required:true,
        type:String,
        unique:true
    },
    password:{
        required:true,
        type:String
    }
})
personShema.pre('save',async function(next){
    const person=this
    //hash password only if it has been modified or is new
    if(!person.isModified('password'))return next()

try{
   //hash password generation
   const salt=await  bcrypt.genSalt(10)
   //hash password
   const hashedPassword=await bcrypt.hash(person.password,salt)
   //overide the plain password with hashed one
   person.password=hashedPassword

next()
}catch(err){
    return next(err)

}
})
personShema.methods.comparePassword=async function(candidatePassword){
    try{
        const isMatch=await bcrypt.compare(candidatePassword,this.password)
        return isMatch

    }catch(err){
        throw err
    }
}


//for comparing it extracts salt from password and add it with password used and match it with hash
const Person=mongoose.model('Person',personShema)
module.exports=Person

