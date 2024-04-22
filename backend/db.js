const mongoose = require('mongoose');

const connectToMongo = ()=>{
    mongoose.connect('mongodb+srv://nikhilkadiyan:YOUR_PASSWORD@cluster0.hbdkvfp.mongodb.net/inotebook').then(console.log("connected to mongo successfully"));
}

module.exports = connectToMongo;
