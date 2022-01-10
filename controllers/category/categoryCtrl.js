const expressAsyncHandler = require("express-async-handler");
const res = require("express/lib/response");
const Category = require("../../model/category/Category");


const createCategoryCtrl = expressAsyncHandler(async(req,res) =>{
   try {
       const category = await Category.create({
           user: req.user._id,
           title : req.body.title,

       });
       res.json(category);
       
   } catch (error) {
       res.json(error);
       
   }
});

//fetch all gategory

const getCategoryCtrl = expressAsyncHandler(async(req,res) =>{
    try {
        const categories = await Category.find({})
        .populate("user")
        .sort("-createdAt");
        res.json(categories);

    } catch (error) {
        res.json(error);
        
    }
})

//fetch single category

const getSingleCategoryCtrl = expressAsyncHandler(async(req,res) =>{
    const {id} = req.params;
    try {
        const singleCategory = await Category.findById(id)
            .populate("user")
            .sort("-createdAt");
            res.json(singleCategory);

        
    } catch (error) {
        res.json(error);
        
    }
   
})

//update category

const updateCategoryCtrl = expressAsyncHandler( async(req,res) => {
    const {id} = req.params;
    try {
        const updatedCategory = await Category.findByIdAndUpdate(id,{
            title: req?.body?.title,
        },
        {
              new: true,
              runValidators: true,
        }
        );
        res.json(updatedCategory);
        
    } catch (error) {
        res.json(error);
        
    }
})

//delete category

const deleteCategoryCtrl = expressAsyncHandler(async(req,res) => {
    const {id} = req.params;

    try {
        const deleteCategory = await Category.findByIdAndDelete(id);
        res.json(deleteCategory);
        
    } catch (error) {
        res.json(error);
        
    }
})



module.exports = {
    createCategoryCtrl,
    getCategoryCtrl,
    getSingleCategoryCtrl,
    updateCategoryCtrl,
    deleteCategoryCtrl,
};