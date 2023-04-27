import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import {HttpException} from '../shared/index.js';

dotenv.config();


const validAuthorization = (req,res,next) => {
    const username = req.query.username;
    const authorizationHeader = req.headers.authorization;
    const userToken = authorizationHeader.substring(7);

    try {
        const isValidToken = jwt.verify(userToken,process.env.JWT_KEY);
        if(isValidToken.username != username) {
            return res.status(401).json({
                "status" : "Failed",
                "message" : "Invalid token",
            })
        }
        next();
    }catch(err) {
        next(new HttpException(401,"Invalid credentials",err));
    }
}

export default validAuthorization;