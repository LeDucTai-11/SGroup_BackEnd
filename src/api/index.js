import express from 'express';
import {UserRouter}  from './users/index.js';

const userRouter = express.Router();

userRouter.use('/users',UserRouter);


export default userRouter;
