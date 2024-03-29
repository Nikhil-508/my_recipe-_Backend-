const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
})

// Create user model
const UserModel = mongoose.model('User', UserSchema);

// Export user model
module.exports = UserModel;