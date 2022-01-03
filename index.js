const express = require("express");
const dbConnect = require("./config/db/dbConnect");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
// code by Saurabh
const cors = require("cors");

const {errorHandler , notFound }= require("./middlewares/error/errorHandler");

const app = express();

const userRoutes = require("./route/users/usersRoute");

dotenv.config();
//const { errorHandler, notFound } = require("./middlewares/error/errorHandler");
const categoryRoutes = require("./route/category/categoryRoute");

app.use(bodyParser.urlencoded({extended:false}));
app.use(express.json());

// cors by Saurabh
app.use(cors());

//Databse
dbConnect();

//Middleware
app.use(express.json());

//Users route
app.use("/api/users", userRoutes);

//category route
app.use("/api/category",categoryRoutes);

//err handler
app.use(notFound);
app.use(errorHandler);

//server
const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server is running ${PORT}`));
