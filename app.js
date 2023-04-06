const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

const users = [
	{
		"id": 1,
		"fullname": "Nguyen Huy Tuong",
		"gender": true,
		"age": 18
	},
	{
		"id": 2,
		"fullname": "Nguyen Thi Tuong",
		"gender": false,
		"age": 15
	}
];

app.get('/user', (req,res) => {
    res.status(200).send(users);
})

app.get('/user/:id', (req, res) => {
    const id = req.params.id;
    const user = users.find((user) => user.id == id);
    if(user != null) {
        res.status(200).send(users.find((user) => user.id == id));
    }else {
        res.send("User not found with ID: "+id);
    }
});

app.put('/user/:id', (req, res) => {
    const id = req.params.id;
    const user = users.find((user) => user.id == id);
    if(user != null) {
        user.id = id;
        user.fullname = req.body.fullname;
        user.gender = req.body.gender;
        user.age = req.body.age;
        res.status(204).send("User updated successfully"); 
    }else {
        res.send("User not found with ID: "+id);
    }

});

app.post('/user',(req,res) => {
    const user = {
        "id" : users.length + 1,
        "fullname": req.body.fullname,
        "gender": req.body.gender,
        "age": req.body.age
    }
    users.push(user);
    res.status(201).send(user);
});

app.delete('/user/:id',(req,res) => {
    const id = req.params.id;
    const user = users.find((user) => user.id == id);
    if(user != null) {
        users.splice(users.indexOf((user) => user.id == id), 1);
        res.status(204).send("User deleted successfully");
    }else {
        res.send("User not found with ID: "+id);
    }
});

app.listen(port, () => {
    console.log("Listening on port " + port);
});

