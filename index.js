const express = require("express");
const dbConnect = require("./config/dbConnect");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
// code by Saurabh
const cors = require("cors");

const {errorHandler , notFound }= require("./middlewares/error/errorHandler");

const app = express();

const userRoutes = require("./route/users/usersRoute");

dotenv.config();

app.use(bodyParser.urlencoded({extended:false}));
app.use(express.json());

// cors by Saurabh
app.use(cors());

//Databse
dbConnect();

//users route
app.use("/",userRoutes);

//error handler
app.use(notFound);
app.use(errorHandler);


//Server
const port = process.env.PORT || 4000;
app.listen(port ,() =>{
    console.log(`server is working on localhost: ${port}`);
} )