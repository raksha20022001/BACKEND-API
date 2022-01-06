const expressAsyncHandler = require("express-async-handler");
const generateToken = require("../../config/token/generateToken");
const User = require("../../model/user/User");
const validateMongodbId = require("../../utils/validateMongodbID");
const sgMail = require("@sendgrid/mail");


sgMail.setApiKey(process.env.SEND_GRID_API_KEY );

//-------------------------------------
//Register
//-------------------------------------

const userRegisterCtrl = expressAsyncHandler(async (req, res) => {
  //Check if user Exist
  const userExists = await User.findOne({ email: req?.body?.email });

  if (userExists) throw new Error("User already exists");
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
});

//-------------------------------
//Login user
//-------------------------------

const loginUserCtrl = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;
  //check if user exists
  const userFound = await User.findOne({ email });
  //Check if password is match
  if (userFound && (await userFound.isPasswordMatched(password))) {
    res.json({
      _id: userFound?._id,
      firstName: userFound?.firstName,
      lastName: userFound?.lastName,
      email: userFound?.email,
      profilePhoto: userFound?.profilePhoto,
      isAdmin: userFound?.isAdmin,
      token: generateToken(userFound?._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid Login Credentials");
  }
});

//------------------------------
//Users
//-------------------------------
const fetchUsersCtrl = expressAsyncHandler(async (req, res) => {
  console.log(req.headers);
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    res.json(error);
  }
});

//------------------------------
//Delete user
//------------------------------
const deleteUsersCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  //check if user id is valid
  validateMongodbId(id);
  try {
    const deletedUser = await User.findByIdAndDelete(id);
    res.json(deletedUser);
  } catch (error) {
    res.json(error);
  }
});

//----------------
//user details
//----------------
const fetchUserDetailsCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  //check if user id is valid
  validateMongodbId(id);
  try {
    const user = await User.findById(id);
    res.json(user);
  } catch (error) {
    res.json(error);
  }
});

//------------------------------
//User profile
//------------------------------

const userProfileCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const myProfile = await User.findById(id);
    res.json(myProfile);
  } catch (error) {
    res.json(error);
  }
});

//------------------------------
//Update profile
//------------------------------
const updateUserCtrl = expressAsyncHandler(async (req, res) => {
  const { _id } = req.user;
  
  validateMongodbId(_id);
  const user = await User.findByIdAndUpdate(
    _id,
    {
      firstName: req?.body?.firstName,
      lastName: req?.body?.lastName,
      email: req?.body?.email,
      bio: req?.body?.bio,
    },
    {
          new: true,
          runValidators: true,
        }
  );
  res.json(user);
 
});

//------------------------------
//Update password
//------------------------------

const updateUserPasswordCtrl = expressAsyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { password } = req.body;

  validateMongodbId(_id);
  const user = await User.findById(_id);

  if(password) {
    user.password = password;
    const updatetedUser  = await user.save();
    res.json(updatetedUser);

  }else{
    res.json(user);
  }

});

//---------------------------------
//follow the user
//---------------------------------

const followingUserCtrl = expressAsyncHandler ( async (req,res) => {
      const { followId } = req.body;
      const loginUserId = req.user.id;

      const targetUser = await User.findById(followId);

      const alreadyFollowing = targetUser?.followers?.find(
        user => user?.toString() === loginUserId?.toString()
      );
     
      if (alreadyFollowing) throw new Error("You have already followed this user");

  //1. find the user you want to follow and update the follower array
      await User.findByIdAndUpdate(followId,{
        $push: {followers: loginUserId},
        isFollowing: true,
      })

   //2.find the login user and update the following array
       await User.findByIdAndUpdate(loginUserId,{
         $push: {following: followId},
       })
   
      res.json("you have successfully followed the user");
         
});

// ---------------------------------------------------------------------------
//unfollow the user
//-----------------------------------------------------------------------------

const unfollowUserCtrl = expressAsyncHandler(async(req,res) => {
  const {unfollowId} = req.body;
  const loginUserId = req.user.id;

  await User.findByIdAndUpdate(unfollowId,{
    $pull : {followers: loginUserId},
  })

  await User.findByIdAndUpdate(loginUserId,{
    $pull : {following : unfollowId},
  })

  res.json("unfollow the user successfully");
})

//--------------------
//Blocked user
//--------------------

const userBlockedCtrl = expressAsyncHandler( async(req,res) => {
  const {id} = req.params;
  validateMongodbId(id);

  const user = await User.findByIdAndUpdate(id,
    {
      isBlocked: true,
  },
  {new: true}
  )
  res.json(user);

})

//---------------------
//unblocked user
//---------------------

const userUnBlockedCtrl = expressAsyncHandler( async(req,res) => {
  const {id} = req.params;
  validateMongodbId(id);

  const user = await User.findByIdAndUpdate(id,
    {
      isBlocked : false,
  
    },
    {new: true}
    )

    res.json(user);
});


//----------------
//verification ctrl

const generateVerificationTokenCtrl = expressAsyncHandler ( async(req,res) => {
  const loginUserId = req.user.id;
  const user = await User.findById(loginUserId);
 
    try {
   
      
      const msg = {
        to : user.email,
      
        from: 
        {
          name: 'web blog',
          email : 'aarushkumar368@gmail.com', 
        },
        subject: 'Sending with SendGrid is Fun',
        text: 'this is my blog web app',
        html: '<strong >this is my blog web appt</strong>',
      }
      await sgMail.send(msg);
      res.json("email sent");   

    } catch (error) {
      res.json(error);
      
    }
})


module.exports = {
  userRegisterCtrl,
  loginUserCtrl,
  fetchUsersCtrl,
  deleteUsersCtrl,
  fetchUserDetailsCtrl,
  userProfileCtrl,
  updateUserCtrl,
  updateUserPasswordCtrl,
  followingUserCtrl,
  unfollowUserCtrl,
  userBlockedCtrl,
  userUnBlockedCtrl,

  generateVerificationTokenCtrl,
};
