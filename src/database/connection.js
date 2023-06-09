import mysql from 'mysql2'
import dotenv from 'dotenv'
import { query } from 'express';
dotenv.config()

const connection = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

export default connection;
