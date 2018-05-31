import jwt from 'jsonwebtoken';
import config from '../../config';

const secretKey = config.SECRET_KEY;

const auth = (req, res, next) => {
    const token = req.headers['Authorization']

    if(token){
        jwt.decode(token, secretKey).then((err,decoded) => {
            if(err){
                return res.status(500).json({
                    message : "Error deccoding token"
                })
            } else {
                req.decoded = decoded;
                next();
            }
        })
    } else {
        return res.status(401).json({
            message : "No token"
        })
    }
}

export default auth;