const passport=require('passport')
const LocalStratergy=require('passport-local').Strategy//username and password stratergy
const Person=require('./models/Person')
passport.use(new LocalStratergy(async (username,password,done)=>{
    try{
        const user=await Person.findOne({username:username})
        if(!user){
            return done(null,false,{message:'Incorrect username'})
        }
        const isPassword=await user.comparePassword(password)
        if(isPassword){
            return done(null,user)
        }
        else{
            return done(null,false,{message:'Incorrect Password'})
        }

    }catch(err){
        return done(err)

    }
}))
module.exports=passport
