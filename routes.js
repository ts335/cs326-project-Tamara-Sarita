import express from "express"; // Include ExpressJS
import uuid from "uuid";

const app = express();
const router = express.Router();

let users = { //mock database
    id: 1,
    firstName: "Tamara",
    lastName: "Sarita",
    userName: "tsarita",
    psw: "password"

}

router.get("/", (req, res) => { //displays user data in api response
    res.json(users); 
});

router.get("/:id", (req, res) => {
    const found = users.some(user => user.id === parseInt(req.params.id));
    if (found) {
      res.json(users.filter(user => user.id === parseInt(req.params.id)));
    } else {
      res.sendStatus(400);
    }
  });

router.post("/", (req, res) => {
    let newUser = {
        id: uuid.v4(),
        firstname: req.body.firstName,
        lastname: req.body.lastName,
        userName: req.body.userName,
        psw: req.body.psw
    }

    if (!newUser.userName) {
        return res.sendStatus(400);
    }
    users.push(newUser); //adding new user to mock database
    res.json(users);//sending json of users
});


router.post("/login", (req, res) => {
    //authenticate
    let username = req.body.userName;
    let password = req.body.psw;
    res.send(`Username: ${username} Password: ${password}`);
});

router.put("/user", (request, response) => {
    res.send('<button type ="submit">UPDATE</button>')
    //update user information
});

router.delete("/user", (request, response) => {
    res.send('<button type ="submit">delete</button>')
    //delete user information
});
