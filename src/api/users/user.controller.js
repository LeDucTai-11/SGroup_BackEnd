class UserController {
    constructor() {
        this.users = [
            {
                "id": 1,
                "fullname": "Nguyen Huy Tuong",
                "gender": true,
                "age": 18
            },
            {
                "id": 2,
                "fullname": "Nguyen Thi Tuong",
                "gender": false,
                "age": 15
            }
        ];
    }

    checkID = (req,res,next) => {
        const user = this.users.find((user) => user.id == req.params.id);
        if(user == null) {
            return res.status(404).json({
                "status": "failed",
                "message": `User does not exist with id = ${req.params.id} .`
            });
        }
        next();
    } 

    getAllUser = (req,res) => {
        return res.status(200).json(this.users);
    }

    getUserById = (req,res) => {
        const user = this.users.find((x) => x.id == req.params.id);
        return res.status(200).json(user);
    }

    createNewUser = (req,res) => {
        const NewUser = {
            "id" : this.users.length + 1,
            "fullname" : req.body.fullname,
            "gender" : req.body.gender,
            "age" : req.body.age 
        };
        this.users.push(NewUser);
        res.status(201).json(NewUser);
    }

    updateUser = (req,res) => {
        const user = this.users.find((user) => user.id == req.params.id);
        user.fullname = req.body.fullname;
        user.gender = req.body.gender;
        user.age = req.body.age;

        return res.status(204).json();
    }

    deleteUser = (req,res) => {
        const index = this.users.map(x=>x.id).indexOf(Number(req.params.id));
        this.users.splice(index, 1);

        return res.status(204).json();
    }
}

export default new UserController();