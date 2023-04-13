import connection from './connection.js'

connection.getConnection((err,connection) => {
    if(err) {
        console.error('Connection error : ', + err);
    }else {
        connection.query(`CREATE TABLE if NOT exists user (
            id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
            fullname VARCHAR(255) NOT NULL,
            gender bit not null,
            age INT NOT NULL
        )`,(err) => {
            connection.end(); 
            if(err) {
                console.error('Error while excuting query : ', + err);
            }
        });
    }

})