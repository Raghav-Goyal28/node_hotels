const mongoose=require('mongoose');
require('dotenv').config();
// define mongodb connection url
//const mongoURL='mongodb://localhost:27017/hotels'
const mongoURL=process.env.MONGODB_URL;

// Set up mongo connection
mongoose.connect(mongoURL,{
    useNewUrlParser : true,
    useUnifiedTopology:true,
})

// get default connection
const db=mongoose.connection;

// define event listners for database connection
db.on('connected',()=>{
    console.log('mongo connected');
});
db.on('error',()=>{
    console.log('mongo connection err:',err);
});

//export db;
module.exports=db;