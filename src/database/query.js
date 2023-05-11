import connection from "./connection.js";
import HttpException from "../shared/http-exception.js";

export default (sql, values) => {
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
                        // console.error('Error while excuting query: ', err);
                        reject(new HttpException(500,"Internal Server Error",err));
                    } else {
                        resolve(results);
                    }
                });
            }
        });
    });
};