import express from 'express'
import jsonwebtoken from 'jsonwebtoken'
import crypto from 'crypto'

const app = express()
app.use(express.json());


const users = [
    {
        username: 'thinh',
        age: 22,
        email: 'thinh@gmail.com',
        id: 1,
        password: 'thinh12345',
        balance: 20000,
    },
    {
        username: 'phu',
        age: 24,
        email: 'phu@gmail.com',
        id: 2,
        password: 'phu12345',
        balance: 1000000000,
    },
]

const SECRET = "secret123";

app.post('/login', (req,res,next) => {
    const { username, password } = req.body;
    const user = users.find((x) => x.username == username);
    if(!user) {
        return res.status(404).json({
            "message" : "User not found",
        });
    }

    if(user.password == password) {
        const jwt = jsonwebtoken.sign({
            "id" : user.id,
            "username" : user.username,
            "email" : user.email
        },SECRET);

        return res.status(200).json({
            "data" : jwt,
            "message" : "Login successfully"
        });
    }

    return res.status(401).json({
        "message" : "Invalid credentials"
    });
});

app.get("/blance", (req,res,next) => {
    const id = req.query.id;
    const authorizationHeader = req.headers.authorization;
    const userToken = authorizationHeader.substring(7);

    // Verify token
    try {
        const isValidToken = jsonwebtoken.verify(userToken,SECRET);

        if(isValidToken.id == id) {
            const user = users.find(x => x.id == id);
            return res.status(200).json({
                "Blance" : user.balance
            });
        } 
        return res.status(401).json({
            "message" : "Unauthorized"
        });
    }catch(err) {
        return res.status(401).json({
            "message" : err.message
        });
    }
})

app.listen(3000,() => {
    console.log("Listening on port 3000...");
})
