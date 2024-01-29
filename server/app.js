const express = require('express');
const cors = require('cors');
const {MongoClient} = require('mongodb');

const app = express();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server running on the port number ${PORT}`));

//Configuration for MongoDB
const url = 'mongodb://0.0.0.0';
const client = new MongoClient(url);
//Simple Web API
app.get('/klef/cse', async function(req, res){
    //res.send("Computer Science and Engineering");
    //res.json("Computer Science");
    try
    {
        conn = await client.connect();
        db = conn.db('s22');
        users = db.collection('users');
        data = await users.find({"firstname":"KPN"}).countDocuments();
        res.json(data);
        conn.close();
    }catch(err)
    {
        res.json(err).status(404);
    }
});

//REGISTRATION MODULE
app.post('/registration/signup', async function(req, res){
    try
    {
        conn = await client.connect();
        db = conn.db('s22');
        users = db.collection('users');
        data = await users.insertOne(req.body);
        res.json("Registered Successfully...");
        conn.close();
    }catch(err)
    {
        res.json(err).status(404);
    }
    //res.json(req.body);
});
//LOGIN MODULE
app.post('/login/signin',async function(req,res){
    try{
        conn = await client.connect(); //client connection
        db=conn.db('s22'); //database name
        users=db.collection('users');
        data = await users.count(req.body);//it reuturns  0 or 1
        conn.close();
        res.json(data);
    }
    catch(err){
        res.json(err).status(404);
    }
});
//HOME MODULE
app.post('/home/uname',async function(req,res){
    try{
        conn = await client.connect(); //client connection
        db=conn.db('s22'); //database name
        users=db.collection('users');
        data = await users.find(req.body, {projection : {firstname: true, lastname : true }}).toArray();// it give first name and last name check in restclient tool
        conn.close();
        res.json(data);
    }
    catch(err){
        res.json(err).status(404);
    }
});
//menu
app.post('/home/menu',async function(req,res){
    try{
        conn = await client.connect(); //client connection
        db=conn.db('s22'); //database name
        menu=db.collection('menu'); //collection name
        data = await menu.find().sort({mid:1}).toArray();  //sort({mid:1}) it used to sort based on mid
        conn.close();
        res.json(data);
    }
    catch(err){
        res.json(err).status(404);
    }
});
//sub menu
app.post('/home/menus',async function(req,res){
    try{
        conn = await client.connect(); //client connection
        db=conn.db('s22'); //database name
        menus=db.collection('menus'); //collection name
        data = await menus.find(req.body).sort({smid:1}).toArray();  //sort({smid:1}) it used to sort based on smid
        conn.close();
        res.json(data);
    }
    catch(err){
        res.json(err).status(404);
    }
});