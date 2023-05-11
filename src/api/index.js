import express from 'express';
import {UserRouter}  from './users/index.js';
import { AuthRouter } from './auth/index.js';

const routers = express.Router();

routers.use('/users',UserRouter);
routers.use('/auth',AuthRouter);

export default routers;
