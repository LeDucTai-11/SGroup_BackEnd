import express from "express";
import userController from "./user.controller.js";
import {ValidateUser,validAuthorization,ValidateUserUpdate} from '../../middlewares/index.js'

const router = express.Router();

router.param('id',userController.checkID);

router
    .get('/',userController.getAllUser)
    .get('/:id',userController.getUserById)
    .post('/',ValidateUser,userController.createNewUser)
    .put('/:id',ValidateUserUpdate,userController.updateUser)
    .delete('/:id',userController.deleteUser);

export default router;

