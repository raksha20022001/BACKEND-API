const { Admin } = require("mongodb");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");


const userSchema = new mongoose.Schema({
    firstName: {
        required: [true,"First name is required"],
        type: String,
    },
    lastName: {
        required: [true,"Last name is required"],
        type: String,
    },
    profilePhoto: {
        type: String,
        default: `https://media.istockphoto.com/photos/human-virus-picture-id1294037667?b=1&k=20&m=1294037667&s=170667a&w=
        0&h=B09uSBbtZXJ0TxHrpnmMvEppiBNVAjJujchnADLfNug=`,
    },
    email: {
        type: String,
        required: [true,"Email is required"],
    },
    bio: {
        type: String,
    },
    password: {
        type :String,
        required:[true,"Password is required"],
    },
    postCount: {
        type: Number,
        default: 0,
    },
    isBlocked: {
        type: Boolean,
        default: false,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    role: {
        type: String,
        enum : ["Admin","Guest","Blogger"],
    },
    isFollowing: {
        type: Boolean,
        default: false,
    },
    isUnFollowing: {
        type: Boolean,
        default: false,
    },
    isAccountVerified: {
        type:Boolean,
        default: false,
    },
    accountVerificationToken: String,
    accountVerificationTokenExpires: Date,
    viewedBy : {
        type: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],
    },
    followers: {
        type: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
          ],
    },
    following: {
        type: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
          ],
    },
    passwordChangeAt: Date,
    passwordResetToken : String,
    passwordResetExpires :Date,

    active: {
        type: Boolean,
        default:false,
    },


},

{
    toJSON: {
        virtuals: true,

    },
    toObject: {
        virtuals:true,
    },
    timestamps: true,

}

);
//hash password
 userSchema.pre('save',async function(next) {
     if(!this.isModified("password")){
         next();
     }
    const salt =await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next()
 });

 //matched password
 userSchema.methods.isPasswordMatched = async function(enteredPassword) {
     return await bcrypt.compare(enteredPassword, this.password);
 };


const User = mongoose.model("User",userSchema);

module.exports = User;