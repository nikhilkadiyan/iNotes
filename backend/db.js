const mongoose = require('mongoose');
const MONGO_PASS=process.env.MONGO_PASS;

const connectToMongo = ()=>{
<<<<<<< HEAD
    mongoose.connect(`mongodb+srv://nikhilkadiyan:${MONGO_PASS}@cluster0.hbdkvfp.mongodb.net/inotebook`).then(console.log("connected to mongo successfully"));
=======
    mongoose.connect('mongodb+srv://nikhilkadiyan:YOUR_PASSWORD@cluster0.hbdkvfp.mongodb.net/inotebook').then(console.log("connected to mongo successfully"));
>>>>>>> de27008fb0b9c8c4036cbe5c7f7caa692769630f
}

module.exports = connectToMongo;
