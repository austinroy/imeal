import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import uniqueValidator from 'mongoose-unique-validator';


const userSchema = Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: String,
});

userSchema.pre('save', function save(next) {
  const user = this;

  if (!user.isModified('password')) {
    return next();
  }
  // Hash password
  return bcrypt.hash(user.password, 256)
    .then((hash, err) => {
      if (err) {
        return next(err);
      }
      user.password = hash;
      return next();
    });
});

userSchema.methods.comparePassword = function comparePassword(password) {
  const user = this;
  return bcrypt.compareSync(password, user.password);
};

userSchema.plugin(uniqueValidator);

const User = mongoose.model('User', userSchema);

export default User;
