const jwt = require('jsonwebtoken');
const JWT_Sec = 'Mady$1E+6'

const fetchUser=(req,res,next)=>{
    const token =req.header('auth-token');
    if(!token){
        res.status(401).send({error:"Please authenticate using a valid token"})
        
    }
    try {
        const data =jwt.verify(token,JWT_Sec);
        // res.send(data);==> user object containeing id (which we have set in login route)
        req.user=data.user;
        next();
    } catch (error) {
        res.status(401).send({error:"Please authenticate using a valid token"})
    }
}
module.exports=fetchUser;