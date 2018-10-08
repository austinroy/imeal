const mongoose =require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI, () => {
});

var db = mongoose.connection;

const dropUsers = () => {
    return db.collection('users').drop(function(err, response) {
        console.log("response");
    });
}

const dropMeals = () => {
    return db.collection('meals').drop(function(err, response) {
        console.log("response");
    });
}

dropMeals();
dropUsers();

db.close()
