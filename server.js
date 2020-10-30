
require('dotenv').config()
const express = require('express');
const app = express();

const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

app.use(cookieParser());

const verifyToken = (req, res, next) => {
    let token = req.cookies.jwt; // COOKIE PARSER GIVES YOU A .cookies PROP, WE NAMED OUR TOKEN jwt
  
    console.log("Cookies: ", req.cookies.jwt);
  
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedUser) => {
      if (err || !decodedUser) {
        return res.status(401).json({ error: "Unauthorized Request" });
      }
      req.user = decodedUser; // ADDS A .user PROP TO REQ FOR TOKEN USER
      console.log(decodedUser);
  
      next();
    });
  };

//to create a delete method, we should use lines 131,132
const methodOverride = require('method-override');
app.use(methodOverride('_method'));
app.use(express.static("public"));
const fruits = require('./fruits.js');
// always use this for middleware
app.use(express.urlencoded({ extended: true }));

//added for controller to be connected to server.js
app.use("/auth", require("./controllers/authController.js"));
app.use("/fruits", verifyToken, require("./controllers/fruitsControllers.js"));
app.use("/users", verifyToken, require("./controllers/usersController.js"));




// INDEX
app.get('/', (req, res) => {
    res.render('users/index.ejs')
  })


app.listen(process.env.PORT, () => {
    console.log('I am listening');
})





