const express = require("express");
const { createCategoryCtrl, getCategoryCtrl, getSingleCategoryCtrl, updateCategoryCtrl, deleteCategoryCtrl } = require("../../controllers/category/categoryCtrl");
const authMiddleware = require("../../middlewares/auth/authMiddleware");
const categoryRoutes = express.Router();

categoryRoutes.post("/",authMiddleware,createCategoryCtrl);
categoryRoutes.get("/",authMiddleware,getCategoryCtrl);
categoryRoutes.get("/:id",authMiddleware,getSingleCategoryCtrl);
categoryRoutes.put("/:id",authMiddleware,updateCategoryCtrl);
categoryRoutes.delete("/:id",authMiddleware,deleteCategoryCtrl);

module.exports = categoryRoutes;