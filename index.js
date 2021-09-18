require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const port = process.env.PORT || 4000;
const Student = require('./models/User.js');
const mainRoutes = require('./routes/mainRoutes');
app.use(mainRoutes);

app.set('view engine','ejs');
app.use(express.static('./public'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));


mongoose.connect(process.env.MONGO_URL,{
useNewUrlParser: true,
useUnifiedTopology: true,
useCreateIndex: true,
useFindAndModify: false
}).then(()=>console.log('Database Connected'));

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


app.post('/',(req,res)=>
{
    const newStudent = new Student({
        fname : req.body.fname,
        lname : req.body.lname,
        email : req.body.email,
        phone : req.body.phone,
        date : req.body.date,
        gender : req.body.gender,
        address : req.body.address,
        hobby : req.body.hobby
    });


  newStudent.save((err)=>
  {
    if(err)
    {
      const errors = handleErrors(err);
      res.status(400).json({ errors });
    }
    else
    {
      res.render('index',{
        success : 'Students Inserted Successfully'
      })
    }
  });  
  
});


app.listen(port,()=>
{
  console.log(`Listening to port ${port}`);
})