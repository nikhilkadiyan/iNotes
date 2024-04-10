const mongoose = require('mongoose');

const connectToMongo = ()=>{
    mongoose.connect('mongodb+srv://nikhilkadiyan:6OZX6BEUEkzkMIE7@cluster0.hbdkvfp.mongodb.net/inotebook').then(console.log("connected to mongo successfully"));
}

module.exports = connectToMongo;
