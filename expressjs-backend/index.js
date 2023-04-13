const express = require('express');
const app = express();
const port = 8000;
const cors = require('cors');

app.use(cors());

app.use(express.json()); // I added this line, wasn't in the instructions 


const users = { 
    users_list :
    [
       { 
          id : 'xyz789',
          name : 'Charlie',
          job: 'Janitor',
       },
       {
          id : 'abc123', 
          name: 'Mac',
          job: 'Bouncer',
       },
       {
          id : 'ppp222', 
          name: 'Mac',
          job: 'Professor',
       }, 
       {
          id: 'yat999', 
          name: 'Dee',
          job: 'Aspring actress',
       },
       {
          id: 'zap555', 
          name: 'Dennis',
          job: 'Bartender',
       }
    ]
 }

 // implement an ID generator function
function generateId(){
    let id = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 6; i++){
        id += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return id;
}


//  implement an additional action to get all users that match a given name and a given job.
app.get('/users', (req, res) => {
    const name = req.query.name;
    const job = req.query.job;
    if (name != undefined && job != undefined){
        let result = findUserByNameAndJob(name, job);
        result = {users_list: result};
        res.send(result);
    }
    else if (name != undefined){
        let result = findUserByName(name);
        result = {users_list: result};
        res.send(result);
    }
    else if (job != undefined){
        let result = findUserByJob(job);
        result = {users_list: result};
        res.send(result);
    }
    else{
        res.send(users);
    }
});
// URL for the get operation: http://localhost:8000/users?name=Mac&job=Bouncer

// need to implement a hard delete operation
app.delete('/users/:id', (req, res) => {
    const id = req.params['id']; //or req.params.id
    let result = findUserById(id);
    if (result === undefined || result.length == 0) // check if user exists
        res.status(404).send('Resource not found.');
    else {
        deleteUser(id);
        res.status(204).end();
    }
});
// URL for the delete operation: http://localhost:8000/users/abc123

app.post('/users', (req, res) => {
    const userToAdd = req.body;
    userToAdd['id'] = generateId(); // add id to the user, part 2 of spec
    addUser(userToAdd);
    // use the http response to attach the newly added json object to the response object.
    res.status(201).send(userToAdd); // 201 is the status code for created, part 1, 3 of spec
});

function addUser(user){
    
    users['users_list'].push(user);
}
function deleteUser(id){
    users['users_list'] = users['users_list'].filter( (user) => user['id'] !== id);
} // Filter out the user with the id

// get users by name
app.get('/users', (req, res) => {
    const name = req.query.name;
    if (name != undefined){
        let result = findUserByName(name);
        result = {users_list: result};
        res.send(result);
    }
    else{
        res.send(users);
    }
});


//get users by id
app.get('/users/:id', (req, res) => {
    const id = req.params['id']; //or req.params.id
    let result = findUserById(id);
    if (result === undefined || result.length == 0)
        res.status(404).send('Resource not found.');
    else {
        result = {users_list: result};
        res.send(result);
    }
});

function findUserById(id) {
    return users['users_list'].find( (user) => user['id'] === id); // or line below
    //return users['users_list'].filter( (user) => user['id'] === id);
}

const findUserByName = (name) => { 
    return users['users_list'].filter( (user) => user['name'] === name); 
}

function findUserByNameAndJob(name, job) {
    return users['users_list'].filter( (user) => user['name'] === name && user['job'] === job);
}

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});  

