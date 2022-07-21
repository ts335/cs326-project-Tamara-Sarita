import 'dotenv/config';
import express from "express"; 
import expressSession from 'express-session';
import auth from './auth.js';
import http from 'http';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import PeopleDatabase from './database.js'; 

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 3000; 
const db = new PeopleDatabase();
await db.connect(); 

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
auth.configure(app, db); //configure auth

/*Checklist:
|||Backend HTTP Server API:
- HTTP server provides API endpoints (routes) for at least one of each CRUD operation - Create, Read, Update, and Delete
- There must be at least one route that receives/responds JSON from the front-end browser
|||Front-End Fetch and Render:
- Separate JS file where each API endpoint in the back-end server is called by the front-end using FETCH
- There must be at least one fetch that sends/receives JSON to the back-end server
- At least one fetch uses data provided as input from the user (e.g., textbox)
-At least one fetch receives data from the server and changes data in the client that is re-rendered to the 
user interface (e.g., scoreboard, todo list, calculator results)
|||Database: 
- The back-end receives data from the front-end and stores it in the database.
- The back-end gets data from the database and sends it back to the front-end.

*/

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
  res.sendFile('client/index.html', { root: __dirname  }); 
});

app.post('/login', auth.authenticate('local', { //redirects user to 
  successRedirect: '/', // when we login, go to /private
  failureRedirect: '/login', // otherwise, back to login
}));

app.get('/register', (req, res) => {
  res.sendFile('client/index.html', { root: __dirname  }); 
});

app.post('/register', async (req, res) => {

  const { firstName, lastName, userName, psw } = req.body;
  if (await db.createPerson(firstName, lastName, userName, psw)) {
    res.redirect('/login');
  } else {
    res.redirect('/register');
  }
});

app.get('/account', checkLoggedIn, (req, res) => {
  // Go to the user's page.
  res.sendFile('client/index.html', { root: __dirname  }); 
  //use "readPerson" function to display username or first name on page?
  res.write('<H1>HELLO ' + req.params.username + '</H1>');
});

app.post('/account', checkLoggedIn, (req, res) => {
  //update user account details
  // const { firstName, lastName, userName, psw } = req.body;
  // if (await db.updatePerson(firstName, lastName, userName, psw)) {
  //   res.redirect('/account');
  // } else {
  //   res.redirect('/account');
  // }

  //delete user account on this page as well
  // if (await db.deletePerson(firstName, lastName, userName, psw)) {
  //   res.redirect('/account');
  // } else {
  //   res.redirect('/account');
  // }
});

app.get('*', (req, res) => {
  res.send('Error');
});

server.listen(port, () => console.log("Listening on port ", port)); //listening on specified port
