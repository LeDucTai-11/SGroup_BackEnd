import dotenv from 'dotenv'
import express from 'express';
import UserRoute from './api/index.js';

const app = express();

dotenv.config();
const port = process.env.PORT


app.use(express.json());

app.use('/',UserRoute);
app.listen(port,() => {
    
    console.log("Listening on port " + port);
})