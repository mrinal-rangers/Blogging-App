const express= require('express');
const app = express();
const port = 8000;
const path = require('path');
const userRoute = require('./routes/user')
const mongoose=require('mongoose');

app.use(express.urlencoded({extended:false}));

mongoose.connect('mongodb://127.0.0.1:27017/blogify').
then((e)=>console.log('mongoDB connected'));

app.set('view engine',"ejs");
app.set('views',path.resolve('./views'))

app.get('/',(req,res)=>{
    return res.render('home');
})

app.use('/user',userRoute);

app.listen(port,()=>console.log(`server started on port : ${port}`));