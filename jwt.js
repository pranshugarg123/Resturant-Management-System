const jwt=require('jsonwebtoken')
const jwtAuthMiddleware=(req,res,next)=>{
    //first check request headers has authorization or not
    

    const authorization=req.headers.authorization
    if(!authorization)return res.status(401).json({error:'invalid token'})//do return next() if u want to go to localauth
    //extract jwt token from reUEST HEADER
    const token=req.headers.authorization.split(' ')[1]
    if(!token){
        return res.status(401).json({error:'unauthorized'})
    }
    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET,{expiresIn:30000})
        //attach user info to request object
        req.user=decoded
        next()
    }catch(err){
        res.status(401).json({error:'invalid token'})
    }
}
const generateToken=(userData)=>{
    return jwt.sign(userData,process.env.JWT_SECRET)
}
module.exports={jwtAuthMiddleware,generateToken}

