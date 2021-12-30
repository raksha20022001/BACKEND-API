const express = require('express');
const { userRegisterCtrl ,userLoginController, fetchUsers, deleteUser, fetchUserDetailsCtrl } = require('../../controllers/users/userCtrl');

const userRoutes = express.Router();

userRoutes.post("/register",userRegisterCtrl);

userRoutes.post("/login", userLoginController);

userRoutes.get("/getUsers" ,fetchUsers);

userRoutes.delete("/:id",deleteUser);

userRoutes.get("/:id",fetchUserDetailsCtrl);
 
module.exports = userRoutes;