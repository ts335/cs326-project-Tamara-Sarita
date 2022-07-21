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

//https://www.simplilearn.com/tutorials/nodejs-tutorial/nodejs-express

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

app.get('/register', (req, res) => {
  res.sendFile('client/index.html', { root: __dirname  }); 
});

app.get('/account', checkLoggedIn, (req, res) => {
  // Go to the user's page.
  res.sendFile('client/index.html', { root: __dirname  }); 
  res.redirect('/account/' + req.user);
});

app.post('/login', auth.authenticate('local', { //redirects user to 
  // use username/password authentication
  successRedirect: '/', // when we login, go to /private
  failureRedirect: '/login', // otherwise, back to login
})
);

app.post('/register', async (req, res) => {
  const { firstName, lastName, userName, psw } = req.body;

  if (await db.createPerson(firstName, lastName, userName, psw)) {
    res.redirect('/login');
  } else {
    res.redirect('/register');
  }
});

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

app.get('*', (req, res) => {
  res.send('Error');
});

server.listen(port, () => console.log("Listening on port ", port)); //listening on specified port
