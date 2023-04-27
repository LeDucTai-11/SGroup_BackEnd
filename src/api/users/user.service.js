import query from "../../database/query.js";
import HttpException from "../../shared/http-exception.js";
import {hashPassword,comparePassword} from "../../helpers/hash.js";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
import crypto from 'crypto';
import { log } from "console";

dotenv.config();
class UserService {

    getAllUser = async () => {
        return await query("Select * from user");
    }

    getUserByID = async (id) => {
        return await query("Select * from user where id = ?", [id]);
    }

    createNewUser = async (user) => {
        const {salt,hashedPassword} = hashPassword(user.password);
        return await query("Insert into user(fullname,gender,age,username,password,salt,email) VALUES(?,?,?,?,?,?,?)", 
        [user.fullname, user.gender, user.age,user.username,hashedPassword,salt,user.email]);
    }

    updateUser = async (id, user) => {
        return await query("Update user SET fullname = ?, gender = ?, age = ? where id = ?", [user.fullname, user.gender, user.age, id]);
    }

    deleteUser = async (id) => {
        return await query("Delete from user where id = ?", [id]);
    }

    getByUserName = async(userName) => {
        return await query("Select * from user where username = ?", [userName]);
    }

    getCredential = async(username,password) => {
        const user = await query("Select * from user where username = ?", [username]);
        // console.log(user[0].password,user[0].salt,password);
        // console.log(crypto.pbkdf2Sync(password, user[0].salt, 1000, 64, 'sha512').toString('hex'));
        if(user[0]) {
            if(comparePassword(user[0].password,user[0].salt,password)) {
                return jwt.sign({
                    id: user[0].id,
                    username: user[0].username,
                },process.env.JWT_KEY);
            }
        }
        return null;
    }
}

export default new UserService();