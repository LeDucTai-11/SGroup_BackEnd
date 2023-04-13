import connection from "../../database/connection.js";
class UserService {

    query = (sql, values) => {
        return new Promise((resolve, reject) => {
            connection.getConnection((err, connection) => {
                if (err) {
                    console.error('Error while connecting pool: ', err);
                    reject(err);
                } else {
                    connection.query(sql, values, (err, results) => {
                        // Trả lại kết nối về pool
                        connection.release();
                        if (err) {
                            console.error('Error while excuting query: ', err);
                            reject(err);
                        } else {
                            resolve(results);
                        }
                    });
                }
            });
        });
    };

    checkID = async (id) => {
        try {
            const user = await this.query('Select * from user where id = ?', [id]);
            if (user.length == 0) {
                return false;
            }
        }
        catch (err) {
            console.error("Error while excuting query");
        }
        return true;
    }

    getAllUser = async () => {
        try {
            return await this.query("Select * from user");
        } catch (err) {
            console.error("Error while excuting query");
        }
    }

    getUserByID = async (id) => {
        try {
            return await this.query("Select * from user where id = ?", [id]);
        } catch (err) {
            console.error("Error while excuting query");
        }
        return null;
    }

    createNewUser = async (user) => {
        try {
            await this.query("Insert into user (fullname,gender,age) VALUES(?,?,?)", [user.fullname, user.gender, user.age]);
            return true;
        } catch (err) {
            console.error("Error while excuting query");
        }
        return false;
    }

    updateUser = async (id, user) => {
        try {
            await this.query("Update user SET fullname = ?, gender = ?, age = ? where id = ?", [user.fullname, user.gender, user.age, id]);
            return true;
        } catch (err) {
            console.error("Error while excuting query");
        }
        return false;
    }

    deleteUser = async (id) => {
        try {
            await this.query("Delete from user where id = ?", [id]);
            return true;
        } catch (err) {
            console.error("Error while excuting query");
        }
        return false;
    }
}

export default new UserService();