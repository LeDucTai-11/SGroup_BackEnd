import express from 'express';
import {UserController} from '../users/index.js';
import AuthController from './auth.controller.js'
import {ValidateUser,ValidateCredential} from '../../middlewares/index.js'

const router = express.Router();

router
    .post('/register',ValidateUser,UserController.isUserExisted,UserController.createNewUser)
    .post('/login',ValidateCredential,UserController.getCredential)
    .post('/forgot-password',AuthController.requestForgetPassword)
    .post('/reset-password',AuthController.resetPassword)

export default router;