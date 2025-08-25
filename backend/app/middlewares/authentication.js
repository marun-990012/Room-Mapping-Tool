import jwt from 'jsonwebtoken';

const authentication = async (req, res, next) => {
    const token = req.headers['authorization'];
    // console.log(token);
    try {

        if(!token){
            return res.status(401).json({message:'token is required'});
        }
        
       const tokenData = jwt.verify(token,process.env.JWT_SECRET);
        req.userId = tokenData.userId;

        next();
    } catch (error) {
        return res.status(401).json({error:error.message});
    }
};

export default authentication;