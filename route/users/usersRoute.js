const express = require("express");
const { unfollowUserCtrl, generateVerificationTokenCtrl } = require("../../controllers/users/usersCtrl");
const { userUnBlockedCtrl } = require("../../controllers/users/usersCtrl");
const { userBlockedCtrl } = require("../../controllers/users/usersCtrl");
const { followingUserCtrl } = require("../../controllers/users/usersCtrl");

const {
  userRegisterCtrl,
  loginUserCtrl,
  fetchUsersCtrl,
  deleteUsersCtrl,
  fetchUserDetailsCtrl,
  userProfileCtrl,
  updateUserCtrl,
  updateUserPasswordCtrl,
  
} = require("../../controllers/users/usersCtrl");
const authMiddleware = require("../../middlewares/auth/authMiddleware");

const userRoutes = express.Router();

userRoutes.post("/register", userRegisterCtrl);
userRoutes.post("/login", loginUserCtrl);
userRoutes.get("/", authMiddleware, fetchUsersCtrl);
userRoutes.put("/password", authMiddleware, updateUserPasswordCtrl);
userRoutes.get("/profile/:id", authMiddleware, userProfileCtrl);
userRoutes.put("/:id", authMiddleware, updateUserCtrl);
userRoutes.delete("/:id", deleteUsersCtrl);
userRoutes.get("/:id", fetchUserDetailsCtrl);
userRoutes.put("/follow/:id",authMiddleware, followingUserCtrl);
userRoutes.put("/unfollow/:id",authMiddleware,unfollowUserCtrl);
userRoutes.put("/isBlocked/:id",authMiddleware,userBlockedCtrl);
userRoutes.put("/isUnBlocked/:id",authMiddleware,userUnBlockedCtrl);
userRoutes.post("/send-email",authMiddleware,generateVerificationTokenCtrl);

module.exports = userRoutes;
