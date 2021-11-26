const User = require("../../model/user/User");

const userRegisterCtrl = async (req, res) => {
  console.log(req.body);
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
};  

const userLoginCtrl = async (req,res) => {
      res.json({
        user: "user login",
      });
}

module.exports = { userRegisterCtrl , userLoginCtrl };
