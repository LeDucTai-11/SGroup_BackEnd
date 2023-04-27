import express from 'express';
import {UserController} from '../users/index.js';
import {ValidateUser,ValidateCredential} from '../../middlewares/index.js'

const router = express.Router();

router
    .get('/', (req,res,next) => {
        res.status(200).json({
            "message": "Hello, world!"
        })
    })
    .post('/register',ValidateUser,UserController.isUserExisted,UserController.createNewUser)
    .post('/login',ValidateCredential,UserController.getCredential)

export default router;