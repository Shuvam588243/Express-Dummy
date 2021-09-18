const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fname : {
    type : [String, 'Please Enter a String Value Only'],
    required : [true, 'First Name is required']
  },
  lname : {
    type : [String, 'Please Enter a String Value Only'],
    required : [true, 'Last Name is required']
  },
  email : {
    type : String,
    required : [true, 'Email is required'],
    unique : [true,'Email must be unique'],
  },
  phone : {
    type : String,
    required : true,
    minlength : [10, 'Phone Number should have a Minimum Length of 10 Digits'],
  },
  date : {
    type : String,
    required : true
  },
  gender : {
    type : String,
    required : true,
  },
  address : {
    type : String,
    required : true
  },
  hobby : {
    type : [String],
    required : true,
  }
});


const userModel = mongoose.model('Student',userSchema);


module.exports = userModel;