import express from 'express';
import User from '../models/users';
import jwt from 'jsonwebtoken';

const router = express.Router();

const getUser = (req, res) => {
    const credentials = {
        username : req.body.username,
        password : req.body.password,
    }
    return User.find(credentials, (err, users) => {
        if(err){
            return res.status(500).json({
                message: "Error finding user"
            })
        } else {
            if(users == []){
                return res.status(404).json({
                    message: "User not found"
                })
            }
            else {
                const user = users[0]
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
        const newUser = User(req.body);
        newUser.save( err => {
            if(err) {
                return res.status(500).json({
                    message : "Error Adding New User"
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
        const {username} = user
        const token = jwt.sign({ username }, 'secret')
        return res.status(200).json({
            message : "User signed in successfully",
            token
        })
    })
})


export default router;
