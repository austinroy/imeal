import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import uniqueValidator from 'mongoose-unique-validator';


const userSchema = mongoose.Schema({
    username : {
        type : String,
        unique : true,
        required : true,
    },
    password : String,
    meals : [{
        type : Schema.Types.ObjectId,
        ref : 'Meal'
    }]
})

userSchema.pre('save', function(next){
    const user = this;

    if(!user.isModified('password')){
        next();
    }
    // Hash password
    bcrypt.hash(user.password,256).then((hash, err) => {
        if(err){
            return next(err);
        } else {
            user.password = hash;
            next();
        }
    })

})

userSchema.methods.comparePassword = function(password){
    var user = this;
    return bcrypt.compareSync(password, user.password);
}

userSchema.plugin(uniqueValidator)

const User = mongoose.model('User', userSchema);

export default User;