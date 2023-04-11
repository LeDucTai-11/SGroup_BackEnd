
import express from 'express';
import UserRoute from './api/index.js';

const app = express();
const port = 3000;

app.use(express.json());

app.use('/',UserRoute);
app.listen(port,() => {
    
    console.log("Listening on port " + port);
})