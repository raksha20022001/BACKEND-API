const User = require("../../model/user/User");
const expressAsyncHandler = require("express-async-handler");


const userRegisterCtrl = expressAsyncHandler( 
  async (req, res) => {
  console.log(req.body);
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

module.exports = { userRegisterCtrl  };
