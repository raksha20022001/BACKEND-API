const express = require('express');
const { userRegisterCtrl ,userLoginController } = require('../../controllers/users/userCtrl');

const userRoutes = express.Router();

// app.post("/api/users/register", userRegisterCtrl );
userRoutes.post("/register",userRegisterCtrl);
userRoutes.post("/login", userLoginController);
 
module.exports = userRoutes;