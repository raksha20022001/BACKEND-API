const express = require("express");
const { createPostCtrl } = require("../../controllers/post/postCtrl");

const postRoutes = express.Router();

const authMiddleware = require("../../middlewares/auth/authMiddleware");

postRoutes.post("/",authMiddleware,createPostCtrl);

module.exports = postRoutes;