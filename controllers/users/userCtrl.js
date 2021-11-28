const User = require("../../model/user/User");
const expressAsyncHandler = require("express-async-handler");
const generateToken = require("../../token/generateToken");
const validateMongodbID = require("../../utils/validateMongodbID");


//----------------------------------------------------
//REGISTER USER 
//---------------------------------------------------

const userRegisterCtrl = expressAsyncHandler( 
  async (req, res) => {
  
  const userExist = await User.findOne({email : req?.body?.email});
  if(userExist) throw new Error("User already registered");
  
  try {
    //Register user
    const user = await User.create({
            firstName: req?.body?.firstName,
            lastName: req?.body?.lastName,
            email: req?.body?.email,
            password: req?.body?.password,
    });
    res.json(user);
  } catch (error) {
    res.json(error);
  }
}  
)

//---------------------------------------------------
//LOGIN USER
//---------------------------------------------------

const userLoginController = expressAsyncHandler(
      async (req,res) => {
        const {email,password} =req.body;
        const userFound  = await User.findOne({email});
        //check if user exists
       if(userFound && (await userFound.isPasswordMatched(password))){
         res.json({
           _id: userFound?._id,
           firstName :  userFound?.firstName,
           lastName : userFound?.lastName,
           email : userFound?.email,
          profilePhoto : userFound?.profilePhoto,
          isAdmin : userFound?.isAdmin,
          token : generateToken(userFound?._id)
         });
       }else{
         res.status(401);
         throw new Error("Invalid Login Crenditials");
       }
       
      }
)


//--------------------------------------
//FETCH USERS
//--------------------------------------

const fetchUsers = expressAsyncHandler(
  async (req,res) => {
    try{
       const users = await User.find({});
       res.json(users);
    }catch (error){
      res.json(error);
    }
  }
)

//---------------------------------------------
//DELETE USER
//---------------------------------------------

const deleteUser =  expressAsyncHandler(
  async (req,res) => {
    const {id} = req.params;
    validateMongodbID(id)
   try {
     const deletedUser = await User.findByIdAndDelete(id);
     res.json("deleted User")
   } catch (error) {
     res.json(error);
   }
  }
   
)

//----------------------------------------------------------
//FETCH USER DETAILS WITH ID
//-----------------------------------------------------------

const fetchUserDetailsCtrl = expressAsyncHandler(async (req,res) => {
     const {id} = req.params;
     validateMongodbID(id);
     try {
       const userDetails = await User.findById(id);
       res.json(userDetails);
     } catch (error) {
        res.json(error);
     }
})

module.exports = {
   userRegisterCtrl ,
   userLoginController ,
   fetchUsers , 
   deleteUser ,
   fetchUserDetailsCtrl 
  };
