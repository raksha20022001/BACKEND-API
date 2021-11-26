const mongoose = require("mongoose");

const dbConnect =  async () => 
{
    await mongoose.connect(process.env.MONGODB_URL,{ 
    useNewUrlParser:true ,
    useUnifiedTopology: true
 }).then(()=>{
    console.log("Database successsfully connected");
}).catch((err) => {
    console.log(err);
})
}

module.exports = dbConnect;