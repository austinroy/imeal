import express from 'express';
import User from '../models/users';
import jwt from 'jsonwebtoken';
import config from '../../config';

const secretKey = config.SECRET_KEY;

const router = express.Router();

const getUser = (req, res) => {
    const credentials = {
        username : req.body.username,
    }
    return User.findOne(credentials,(err, user) => {
        if(err){
            return res.status(500).json({
                message: "Error finding user",
                err
            })
        } else {
            if(!user){
                return res.status(404).json({
                   message : "User not found", 
                })
            } else {
                return user;
            }
        }
    })
}

router.post('/signup', (req, res) => {
    if(!req.body.username || !req.body.password){
        return res.status(400).json({
            message : "Please provide all the details"
        })
    } else {
        const newUser = new User(req.body);
        newUser.save((err) => {
            console.log(err);
            if(err) {
                return res.status(500).json({
                    message : "Error Adding New User",
                    err
                })
            } else {
                return res.status(201).json({
                    message : "New User Added",
                    newUser
                })
            }
            
        })
    }
})

router.post('/login', (req, res) => {
    return getUser(req, res).then(user => {
        const validCredentials = user.comparePassword(req.body.password);

        if(!validCredentials){
            return res.status(403).json({
                message : "Invalid credentials"
            })
        } else {
            const {username, id } = user;
            const userInfo = {username, id}
            const token = jwt.sign( userInfo, secretKey,{ expiresIn : 3600});
            return res.json({
                message : "Logged in successfully",
                user : userInfo,
                token
            })
        }
    })
})


export default router;
