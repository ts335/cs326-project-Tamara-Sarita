import 'dotenv/config';
import express from "express"; // Include ExpressJS
import expressSession from 'express-session';
import users from './users.js';
import auth from './auth.js';
import loginView from '/Users/tamarasarita/github-classroom/cs326-project-Tamara-Sarita/client/script.js';
//import uuid from "uuid";
import http from 'http';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const app = express();
const router = express.Router();
const server = http.createServer(app);
const port = 3000; 
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
app.use(express.urlencoded({extended: true})); //allows us to grab text from form boxes
auth.configure(app);
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
      res.redirect('/#login');
    }
  }

//get - reads/retrieves | post - creates | put - updates | delete - removes
//-/routes
app.get("/", checkLoggedIn, (request, response) => {
    //res.render("index.html");
    response.sendFile( 'client/index.html', { root: __dirname  }); //routing homepage
});

app.get('/register', (req, res) =>
  res.send(loginView) //how to refer to index.html login view?
  //dont send file send something else
);

app.get('/login', (req, res) =>
  res.send('client/index.html/login', { root: __dirname }) //how to refer to index.html login view?
  //dont send file send something else
);

// Handle post data from the login.html form.
// app.post(
//   '/login',
//   auth.authenticate('local', {
//     // use username/password authentication
//     successRedirect: '/private', // when we login, go to /private
//     failureRedirect: '/login', // otherwise, back to login
//   })
// );

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

// app.post("/#login", (req, res) => {
//     // authenticate credentials
//     let username = req.body.userName;
//     let password = req.body.psw;
//     res.send(`Username: ${username} Password: ${password}`);
//     // const found = users.some(user => user.id === parseInt(req.params.id));
//     // if (found) {
//     //   res.json(users.filter(user => user.id === parseInt(req.params.id)));
//     // } else {
//     //   res.sendStatus(400);
//     // }
// });

// app.put("/#account", (req, res) => {
//     //must know what account is currently logged in
//     //info to update here
// });

// app.delete("/#account", (req, res) => {
//     //must know what account is logged in
//     //account to delete will go here
// });


// router.get("/:id", (req, res) => {
//     const found = users.some(user => user.id === parseInt(req.params.id));
//     if (found) {
//       res.json(users.filter(user => user.id === parseInt(req.params.id)));
//     } else {
//       res.sendStatus(400);
//     }
//   });

  server.listen(port, () => console.log("Listening on port ", port)); //listening on specified port
