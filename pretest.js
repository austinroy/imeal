const mongoose =require('mongoose');

mongoose.connect('mongodb://localhost/imeal', () => {
});

var db = mongoose.connection;

const dropUsers = () => {
    db.collection('users').drop(function(err, response) {
        console.log("response");
    }) 
}

const dropMeals = () => {
    db.collection('meals').drop(function(err, response) {
        console.log("response");
    }) 
}

dropMeals();
dropUsers();

db.close()
