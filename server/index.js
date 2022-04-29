const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bcrypt = require('bcrypt')
const saltRounds = 10
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");

 

app.use(express.json());
app.use(cors({
    origin: ["http://localhost:3000"],
    method: ["GET", "POST"],
    credentials: true
}));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(session({
    key: "userId",
    secret: "subscribe",
    resave: false,
    saveUninitialized: false,
    cookie:{
        expires: 60*60*24,
    }
})
);

const db =mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "matsukaze1",
    database: "LoginSystem",

});

app.post('/register', (req,res)=> {
    const username = req.body.username;
    const password = req.body.password;


    bcrypt.hash(password, saltRounds, (err,hash)=>{
        if (err) {
            console.log(err);
        }
        db.query(
            "INSERT INTO users (username,password) VALUES (?,?)",
            [username,hash],
            (err, result)=>{
                console.log(err);
            }
          );
          res.send({message: "Registered succesfully"});

    })
    
});

app.get("/login", (req, res)=>{
    if(req.session.user){
        res.send({loggedIn: true,user: req.session.user, hi: true}); //If user is logged in
    } else {
        res.send({loggedIn: false});
    }

});

app.post('/random', (req,res)=>{
    const marker = req.body.marker;

    // console.log(marker);

    const marker1 = marker;

    // res.send({message: marker1});
    console.log(username1);
    db.query(
        "UPDATE users SET restaurant = ? WHERE username = ?",
        [marker1,username1],
        (err, result)=>{
            // console.log(err);
        }
    );
    db.query(
        "select username from users where restaurant = ?",
        marker1,
        (err, result)=>{
            // console.log(err);
            console.log((result));
            console.log(JSON.stringify(result))
            if (result) {
                res.send({result:result});
            } 
        }
    );

});

app.post('/social', (req,res)=>{
    const username1 = req.body.username2;
    db.query(
        "select socialmedia from users where username = ?",
        username1,
        (err,result)=>{
            if (result){
                res.send({result:result});
            }
        }
    )
});

app.post('/login', (req,res)=>{
    const username = req.body.username;
    global.username1 = req.body.username;
    const password = req.body.password;

    db.query(
    "SELECT * FROM users WHERE username = ?",
    username,
    (err, result)=>{
        if (err) {
            res.send({err:err});
        }  
        if (result.length>0) {
            bcrypt.compare(password, result[0].password, (err, response)=>{
                if (response) {
                    req.session.user = result;
                    console.log(req.session.user);
                    res.send({message: "good one"});
                } else {
                    res.send({message: "Wrong username/password combination!"});
                }
            })
        } else {
            res.send({message: "User does not exist"});
        }
        
    }
  );
});

app.listen(3001, ()=> {
    console.log("running server");
});