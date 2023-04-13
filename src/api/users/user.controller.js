import userService from "./user.service.js";
class UserController {

    checkID = (req,res,next) => {
        userService.checkID(req.params.id)
            .then((result) => {
                if(!result) {
                    return res.status(404).json({
                                "status": "failed",
                                "message": `User does not exist with id = ${req.params.id} .`
                            });
                }
                next();
            })
    } 

    getAllUser = async (req,res) => {
        res.status(200).json(
            await userService.getAllUser()
        );
    }

    getUserById = async (req,res) => {
        res.status(200).json(
            await userService.getUserByID(req.params.id)
        );
    }

    createNewUser = (req,res) => {
        const user = {
            "fullname" : req.body.fullname,
            "gender" : req.body.gender,
            "age" : req.body.age
        }
        userService.createNewUser(user)
            .then((check) => {
                if(check) {
                    res.status(201).json(user);
                }else {
                    res.status(500).json({
                        "message" : "Error while creating user ."
                    });
                }
            });
        
    }

    updateUser = (req,res) => {
        const user = {
            "fullname" : req.body.fullname,
            "gender" : req.body.gender,
            "age" : req.body.age
        }
        userService.updateUser(req.params.id,user)
            .then((check) => {
                if(check) {
                    res.status(204).json();
                }else {
                    res.status(500).json({
                        "message" : "Error while updating user ."
                    });
                }
            })
    }

    deleteUser = (req,res) => {
        userService.deleteUser(req.params.id)
            .then((check) => {
                if(check) {
                    res.status(204).json();
                }else {
                    res.status(500).json({
                        "message" : "Error while deleting user ."
                    });
                }
            })
    }
}

export default new UserController();