import jwt from 'jsonwebtoken';
import config from '../../config';

const secretKey = config.SECRET_KEY;

const auth = (req, res, next) => {
    const token = req.headers['x-access-token'] || req.body.token

    if(token){
        jwt.verify(token, secretKey, function(err, decoded) {
            if(err){
                return res.status(500).json({
                    message : "Invalid token"
                })
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        return res.status(401).json({
            message : "No token"
        })
    }
}

export default auth;