const express = require('express');
const { userRegisterCtrl } = require('../../controllers/users/userCtrl');

const userRoutes = express.Router();

// app.post("/api/users/register", userRegisterCtrl );
userRoutes.post("/api/users/register",userRegisterCtrl);
 
module.exports = userRoutes;