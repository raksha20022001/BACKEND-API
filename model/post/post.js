const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    
    title:{
        type : String,
        required : [true,'post category is required'],
        trim : true,
    },
    category :
    {
       type : String,
       required : [true,'post category is required'],
       default : "All",
    },
    isLiked :
    {
        type : Boolean,
        default : false,
    },
    isDisLiked :
    {
        type : Boolean,
        default : false,
    },
    numViews : {
        type : Number,
        default : 0,
    },
    likes : [
    {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
    },
],
    disLikes : [
    {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
    },
    ],
    user :
    {
        type :mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : [true,"please Author is required"],
    },
    image : {
        type :  String,
        default : "https://cdn.pixabay.com/photo/2021/12/19/10/42/old-6880626_1280.jpg",
    },

},
{
    toJSON : {
        virtuals : true,
    },
    toObject : {
        virtuals : true,
    },
    timestamps :true,
})

//compile

const Post = mongoose.model('Post',postSchema);

module.exports = Post;