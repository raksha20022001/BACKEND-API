const User = require("../../model/user/User");
const expressAsyncHandler = require("express-async-handler");
const generateToken = require("../../token/generateToken");

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

module.exports = { userRegisterCtrl ,userLoginController };
