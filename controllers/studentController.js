const Student = require('../models/User.js');
const mongoose = require('mongoose');


const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = { email: '', password: '' };
  
    // duplicate email error
    if (err.code === 11000) {
      errors.email = 'that email is already registered';
      return errors;
    }
  
    // validation errors
    if (err.message.includes('user validation failed')) {
      // console.log(err);
      Object.values(err.errors).forEach(({ properties }) => {
        // console.log(val);
        // console.log(properties);
        errors[properties.path] = properties.message;
      });
    }
  
    return errors;
  }


const form_get = (req,res) =>
{
    res.render('index',{
        success : ''
      });
}




const show_data = async(req,res) =>
{
    const allStudents = await Student.find();
     res.render('biodata',{
    data : allStudents
  })
}


module.exports = {form_get,show_data}