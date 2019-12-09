const express = require('express');
const session = require ('express-session');
const path = require('path');
const bodyParser = require('body-parser');
const User = require('./database/user.js');
const app = express();

//create an object from the class User in user.js
 const user = new User() ;

//for body parser
app.use(express.urlencoded({extended : false}));

//serve static files
app.use(express.static('public'));

//serve image files
app.use('/images', express.static(__dirname + '/Image'));

//serve css files
app.use('/cssFiles', express.static(__dirname + '/public'));

//serve js files
app.use('/js', express.static(__dirname + '/public'));

//make session
app.use(session({
   secret:'Resturant',
    resave: false,
     saveUninitialized: false,
  cookie: {
     maxAge: 60 * 1000 * 30
     }
}));

//get index page
app.get('/', function(req, res, next){
    let user  = req.session.user;
    //if there is a session named user, that shows that the user is logged in. Thsts why we redirect him to home page using /home rout
     if(user){
         res.redirect('home.html');
         return;
     }
     //if not we will send the index
     res.sendFile('index.html', {root: path.join(__dirname, './public')});
});

//get home page
app.get('/home', function(req, res, next){
    let user = req.session.user;
    
    if (user){
        res.sendFile('home.html', {root: path.join(__dirname, './public')}, {opp: req.session.opp, name: user.username});
        return;
    }
    res.redirect('index.html');
});

//post sign in data
app.post('/signin', (req, res, next) => {
    //data sent from userare stored in req.body object
    //callthe login function and it will return the result(the user data)
	user.login(req.body.username, req.body.password, function(result){
        if(result){
            //store user data in session
            req.session.user = result;
            req.session.opp = 1;
            //reddirect the user to home page
            res.redirect('home.html');

        }else {
           res.send('Username/Password is incorrect');
           
        }
    })
});

//post register data
app.post('/register', (req, res, next) => {
    let userInput = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        address: req.body.address,
        street: req.body.street,
        city: req.body.city,
        zipcode: req.body.zipcode
    };

    //call create function to create a new user. if there is no error this function will return its id
    user.create(userInput, function(lastId){
        //if we are able to create user, we should get an integer id of the inserted user
        if(lastId){
            //get user data by its id and store it in a session
            user.find(lastId, function(result){
                req.session.user = result;
                req.session.opp = 0,
                res.redirect('home.html');
            });

        }else {
            console.log('Error creating a new user..');
        }
    });
});

//get sign out 
app.get('/signout', function(req, res, next){
    //check if the session is exit
    if(req.session.user){
        //destroy the session and redirect user to index page
        req.session.destroy(function(){
            res.redirect('index.html');
        });
    }
});

//errors for page not found
app.use(function(req, res, next){
    var err = new Error('page not found');
    err.status = 404;
    next(err);
});

//handling errors
app.use(function(err, req, res, next){
    res.status(err.status || 500);
    res.send(err.message);
})


//setting up the server
app.listen(8088, ()=> {
    console.log('server is running on port 8088....');
    });
    
    module.exports = app;
