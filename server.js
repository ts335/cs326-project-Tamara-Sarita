//import bodyParser from 'bodyParser'; //including middleware
import express from "express"; // Include ExpressJS
import http from 'http';

const app = express(); //creating an express application
const server = http.createServer(app);
const router = express.Router();
//https://www.simplilearn.com/tutorials/nodejs-tutorial/nodejs-express

const port = 3000; //port we will be using

let __dirname = './'; //path of directory
app.use(express.static(__dirname)); //used to render static pages

//get - reads/retrieves | post - creates | put - updates | delete - removes
app.get("/", (request, response) => {
    response.sendFile("index.html", { root: __dirname  }); //routing homepage
});

// app.post("/register", (req, res) => {
//     let firstname = req.body.firstName;
//     let lastname = req.body.lastName;
//     let username = req.body.userName;
//     let password = req.body.psw;
//     res.send(`First Name: ${firstname} Last Name: ${lastname} Username: ${username} Password: ${password}`);
//     //store data
//     //use it to allow the user to login
// });

// app.post("/login", (req, res) => {
//     //authenticate
//     let username = req.body.userName;
//     let password = req.body.psw;
//     res.send(`Username: ${username} Password: ${password}`);
// });

// app.put("/user", (request, response) => {
//     res.send('<button type ="submit">UPDATE</button>')
//     //update user information
// });

// app.delete("/user", (request, response) => {
//     res.send('<button type ="submit">delete</button>')
//     //delete user information
// });

server.listen(port, () => console.log("Listening on port ", port)); //listening on specified port