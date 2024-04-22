const mongoose = require('mongoose');
const MONGO_PASS=process.env.MONGO_PASS;

const connectToMongo = ()=>{
    mongoose.connect(`mongodb+srv://nikhilkadiyan:${MONGO_PASS}@cluster0.hbdkvfp.mongodb.net/inotebook`).then(console.log("connected to mongo successfully"));
}

module.exports = connectToMongo;
