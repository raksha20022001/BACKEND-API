const express = require("express");
const dbConnect = require("./config/db/dbConnect");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
<<<<<<< HEAD
dotenv.config();
=======
// code by Saurabh
const cors = require("cors");
>>>>>>> origin/dev_by_Saurabh

const {errorHandler , notFound }= require("./middlewares/error/errorHandler");

const app = express();

const userRoutes = require("./route/users/usersRoute");



app.use(bodyParser.urlencoded({extended:false}));
app.use(express.json());

// cors by Saurabh
app.use(cors());

//Databse
dbConnect();

//users route
app.use("/api/users/",userRoutes);

//error handler
app.use(notFound);
app.use(errorHandler);


//Server
const port = process.env.PORT || 4000;
app.listen(port ,() =>{
    console.log(`server is working on localhost: ${port}`);
} )