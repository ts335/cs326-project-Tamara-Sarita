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

function checkLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
      // If we are authenticated, run the next route.
      next();
    } else {
      // Otherwise, redirect to the login page.
      res.redirect('/login');
    }
  }

app.get("/", checkLoggedIn, (req, res) => {
    res.sendFile('client/index.html', { root: __dirname  }); //routing homepage
});

app.get('/register', (req, res) => {
  res.sendFile('client/index.html', { root: __dirname  }); 
});

app.post('/register', async (req, res) => {
  const { firstName, lastName, userName, psw } = req.body;
  try {
    const newUser = await db.createPerson(firstName, lastName, userName, psw);
    res.json(newUser); 
  } catch(error) {
    console.log(error);
    res.status(500).send("Error registering user");
  }
});

app.get('/login', (req, res) => {
  res.sendFile('client/index.html', { root: __dirname  }); 
});

app.post('/login', async (req, res) =>{

  const { id, userName, psw } = req.body; 
  const user = await db.readPerson(userName);
  if (!user) {
    return res.status(400).send("Invalid username. Try again."); //maybe add alert and redirect them?
  }
  if (user.psw !== psw) { 
    await new Promise((r) => setTimeout(r, 2000)); 
    return res.status(400).send("Invalid password"); //maybe add alert and redirect them?
  }
  res.json(user); //sending entire user object which will return everything about that user in particular
}); 

app.get('/account', checkLoggedIn, (req, res) => { 
  res.sendFile('client/index.html', { root: __dirname  }); 
});

app.put('/account', async (req, res) => {
  try {
    const { firstName, lastName, userName, psw, id } = req.body;
    const updateUser = await db.updatePerson( id, firstName, lastName, userName, psw);
    res.json(updateUser); 
  } catch(error) {
    console.log(error);
    res.status(500).send("Error updating account");
  }
});

app.delete('/account', async (req, res) => {
  try {
    const { id } = req.body;
    const removeUser = await db.deletePerson(id);
    res.json(removeUser); 
  } catch(error) {
    console.log(error);
    res.status(500).send("Error deleting account.");
  }
});

app.get('*', (req, res) => {
  res.send('Error');
});

server.listen(port, () => console.log("Listening on port ", port)); //listening on specified port
