import userService from "./user.service.js";
class UserController {

    checkID = async (req,res,next) => {
        try {
            const data = await userService.getUserByID(req.params.id);
            if(data.length == 0) {
                return res.status(404).json({
                    "status": "failed",
                    "message": `User does not exist with id = ${req.params.id} .`
                });
            }
            next(); 
        }catch(err) {
            next(err);
        }
    } 

    getAllUser = async (req,res) => {
        try {
            return res.status(200).json(
                await userService.getAllUser()
            );
        }catch(err) {
            next(err);
        }
    }

    getUserById = async (req,res) => {
        try{
            return res.status(200).json(
                await userService.getUserByID(req.params.id)
            );
        }catch(err){
            next(err);
        }
    }

    isUserExisted = async(req,res,next) => {
        try {
            const user = await userService.getByUserName(req.body.username);
            if(user.length != 0) {
                return res.status(409).json({
                    "message" : `User already exists with USERNAME : ${req.body.username}`
                });
            }
            next();
        }catch(err) {
            next(err);
        }
    }

    createNewUser = async (req,res,next) => {
        const user = {
            "fullname" : req.body.fullname,
            "gender" : req.body.gender,
            "age" : req.body.age,
            "username" : req.body.username,
            "password" : req.body.password,
            "confirmPassword" : req.body.confirmPassword,
            "email" : req.body.email
        }
        try {
            await userService.createNewUser(user);
            return res.status(201).json({
                "message" : "User created successfully",
                "user" : user
            });
        }catch(err) {
            next(err);
        }
    }

    updateUser = async (req,res) => {
        try {
            const user = {
                "fullname" : req.body.fullname,
                "gender" : req.body.gender,
                "age" : req.body.age
            }
            await userService.updateUser(req.params.id,user);
            return res.status(204).json({});
        }catch(err) {
            next(err);
        }
    }

    deleteUser = async(req,res) => {
        try {
            await userService.deleteUser(req.params.id);
            return res.status(204).json({});
        }catch(err) {
            next(err);
        }
    }

    getCredential = async (req,res) => {
        const {username,password} = req.body;
        const token = await userService.getCredential(username,password);
        if(token) {
            return res.status(200).json({
                "message" : "Valid credentials",
                "JWT" : token
            })
        }else {
            return res.status(400).json({
                "status" : "failed",
                "message" : "Invalid credentials",
            });
        }
    }
}

export default new UserController();