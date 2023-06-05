import connection from "../../database/knex_connection.js";
import { hashPassword, comparePassword } from "../../helpers/hash.js";
import jwt from 'jsonwebtoken';

class UserService {

    getAllUser = async (page,size) => {
        let users = [];
        console.log(page,size);
        if(page === null || size === null) {
            users = await connection.select().from('user');
        }else {
            users = await connection.select().from('user').limit(size).offset((page - 1) * size);
        }
        return users;
    }

    getUserByID = async (id) => {
        return await connection.select().from('user').where('id', id);
    }

    createNewUser = async (user,userToken) => {
        try {
            const isValidToken = jwt.verify(userToken,process.env.JWT_KEY);
            await connection('user').insert({
                fullname: user.fullname, gender: user.gender, age: user.age,
                username: user.username, email: user.email, password: user.password,
                created_at: new Date(),
                created_by: isValidToken.username
            });
        } catch (err) {
            throw new HttpException(500, err);
        }
        return user;
    }

    updateUser = async (id, user) => {
        await connection('user').where('id', id).update(
            { fullname: user.fullname, gender: user.gender, age: user.age }
        );
    }

    deleteUser = async (id) => {
        await connection.del().where('id', id).from('user');
    }

    getByUserName = async (userName) => {
        return await connection.select().from('user').where('username', 'like', userName);
    }

    getCredential = async (username, password) => {
        const user = await connection.select().where('username', 'like', username).from('user');
        if (user[0]) {
            if (comparePassword(user[0].password, user[0].salt, password)) {
                return jwt.sign({
                    id: user[0].id,
                    username: user[0].username,
                }, process.env.JWT_KEY);
            }
        }
        return null;
    }

}

export default new UserService();