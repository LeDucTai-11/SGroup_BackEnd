import dotenv from 'dotenv'
import express from 'express';
import routers from './api/index.js';
import { exceptionHandler } from './middlewares/index.js';

const app = express();

dotenv.config();
const port = process.env.PORT


app.use(express.json());

app.use('/',routers);
app.use(exceptionHandler);
app.listen(port,() => {
    
    console.log("Listening on port " + port);
})