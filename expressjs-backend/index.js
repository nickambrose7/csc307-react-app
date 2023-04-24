const express = require('express');
const app = express();
const port = 8000;
const cors = require('cors');
const { getUsers } = require('./user-services');
const { addUser } = require('./user-services');
const { findUserByNameAndJob } = require('./user-services');
const { deleteUser } = require('./user-services');


app.use(cors());

app.use(express.json()); // I added this line, wasn't in the instructions 




//  implement an additional action to get all users that match a given name and a given job.
app.get('/users', async (req, res) => {
    const name = req.query.name;
    const job = req.query.job;
    if (name !== undefined && name !== '' && job !== undefined && job !== ''){
        let result = await findUserByNameAndJob(name, job);
        console.log(result);
        res.send(result);
    }
    else{
        result = await getUsers(name, job);
        res.send(result);
    }
    
});
// URL to test

// need to implement a hard delete operation
app.delete('/users/:id', (req, res) => {
    const id = req.params['id']; //or req.params.id
    let result = deleteUser(id);
    if (result === undefined || result.length == 0)
        res.status(404).send('Resource not found.');
    else {
        res.send(result);
    } 
});
// URL for the delete operation: http://localhost:8000/users/abc123

app.post('/users', async (req, res) => {
    const userToAdd = req.body;
    // addUser(userToAdd);
    // // use the http response to attach the newly added json object to the response object.
    // res.status(201).send(userToAdd); // 201 is the status code for created, part 1, 3 of spec
    result = await addUser(userToAdd);
    res.status(201).send(result);
});


// get users by name
app.get('/users/:name', async (req, res) => {
    const name = req.params['name']; 
    result = await getUsers(name);
    res.send(result);
});


//get users by id
app.get('/users/:id', async (req, res) => {
    const id = req.params['id']; //or req.params.id
    // let result = findUserById(id);
    // if (result === undefined || result.length == 0)
    //     res.status(404).send('Resource not found.');
    // else {
    //     result = {users_list: result};
    //     res.send(result);
    // }
    result = await getUsers(id);
    res.send(result);
});
// test with: http://localhost:8000/users/abc123


app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});  

