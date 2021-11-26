const express = require("express");
const dbConnect = require("./config/dbConnect");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

const app = express();

const {userRegisterCtrl , userLoginCtrl} = require("./controllers/users/userCtrl");

dotenv.config();
const port = process.env.PORT || 4000;

app.use(bodyParser.urlencoded({extended:false}));
app.use(express.json());

dbConnect();

app.post("/api/users/register", userRegisterCtrl );

app.post("/api/users/login" ,userLoginCtrl );

app.get("/api/users", (req,res) => {
    res.json({
        user : "Fetch all user"
    });
});

app.listen(port ,() =>{
    console.log(`server is working on localhost: ${port}`);
} )