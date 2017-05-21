const mongoose = require('mongoose')
// const bcrypt = require('bcrypt-nodejs')
// const emailValidator = require('email-validator')


const UserSchema = new mongoose.Schema({
  phone: { type: Number },
  email: { type: String, unique: true },
  name: { type: String },
  password: { type: String }
}, {
  timestamps: true,
})



module.exports = mongoose.model('users', UserSchema)
