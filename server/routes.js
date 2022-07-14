import 'dotenv/config';
import express from "express"; // Include ExpressJS
import expressSession from 'express-session';
import users from './users.js';
import auth from './auth.js';
//import loginView from '/Users/tamarasarita/github-classroom/cs326-project-Tamara-Sarita/client/script.js';
//import uuid from "uuid";
import http from 'http';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const app = express();
const router = express.Router();
const server = http.createServer(app);
const port = process.env.PORT || 3000; 
//let __dirname = './'; //path of directory

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(dirname(__filename));

const sessionConfig = { // Session configuration
    // set this encryption key in Heroku config (never in GitHub)!
    secret: process.env.SECRET || 'SECRET',
    resave: false,
    saveUninitialized: false,
  };

app.use(expressSession(sessionConfig)); //setting up session middleware
app.use(express.static('client')); //used to render static page
app.use(express.json()); //for application to accept JSON
app.use(express.urlencoded({extended: true})); //gets data from form
auth.configure(app); //configure auth

//https://www.simplilearn.com/tutorials/nodejs-tutorial/nodejs-express

//must deploy on heroku and use real database
let database = { //mock databas
    id: 1,
    firstName: "Tamara",
    lastName: "Sarita",
    userName: "tsarita",
    psw: "password"
}

function checkLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
      // If we are authenticated, run the next route.
      next();
    } else {
      // Otherwise, redirect to the login page.
      res.redirect('/login');
    }
  }

//get - reads/retrieves | post - creates | put - updates | delete - removes
app.get("/", checkLoggedIn, (req, res) => {
    res.sendFile('client/index.html', { root: __dirname  }); //routing homepage
});

app.get('/login', (req, res) => {
  res.send(`<center><form action="/#login" method="post"  >
  <div class="container">
    <h1>Login</h1><br>
    <p>Please sign into your account.</p><br>
    <hr>
    <label for="username"><b>Username</b></label>
    <input type="text" placeholder="Enter Username..." name="userName" id="userName" required>
    <br>
    <label for="psw"><b>Password</b></label>
    <input type="password" placeholder="Enter Password..." name="psw" id="psw" required>
    <br>
    <div class="buttons">
    <button type="submit" class="login">Login</button>
    </div></div>
    <br><br><br>
    </form></center>`) 
});

app.get('/register', (req, res) => {
  res.send('client/index.html', { root: __dirname  }); 
});

app.get('/account', (req, res) => {
  res.send('client/index.html', { root: __dirname })
});

app.post('/login', auth.authenticate('local', { //redirects user to 
    // use username/password authentication
    successRedirect: '/', // when we login, go to /private
    failureRedirect: '/login', // otherwise, back to login
  })
);

app.post('/register', (req, res) => {
  const { username, password } = req.body;
  if (users.addUser(username, password)) {
    res.redirect('/login');
  } else {
    res.redirect('/register');
  }
});

app.get('/account', checkLoggedIn, (req, res) => {
    // Go to the user's page.
    res.redirect('/account/' + req.user);
  }
);

app.get(
  '/account/:userID/',
  checkLoggedIn, // We also protect this route: authenticated...
  (req, res) => {
    // Verify this is the right user.
    if (req.params.userID === req.user) {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.write('<H1>HELLO ' + req.params.userID + '</H1>');
      res.write('<br/><a href="/logout">click here to logout</a>');
      res.end();
    } else {
      res.redirect('/account/');
    }
  }
);

// app.post("/#register", (req, res) => {
//     //set variable to database
//     let newUser = { 
//     id: uuid.v4(),
//     firstname: req.body.firstName,
//     lastname: req.body.lastName,
//     userName: req.body.userName,
//     psw: req.body.psw
//    }
//    if (!newUser.userName) {
//     return res.sendStatus(400);
//    }
//    database.push(newUser);
//    //res.json(users);//sending json of users
//    res.status(201).send(); //sending blank response to user
//     //res.send(`First Name: ${firstname} Last Name: ${lastname} Username: ${username} Password: ${password}`);
// });

// app.put("/#account", (req, res) => {
//     //must know what account is currently logged in
//     //info to update here
// });

// app.delete("/#account", (req, res) => {
//     //must know what account is logged in
//     //account to delete will go here
// });

app.get('*', (req, res) => {
  res.send('Error');
});

server.listen(port, () => console.log("Listening on port ", port)); //listening on specified port
