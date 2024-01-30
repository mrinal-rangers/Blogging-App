const express= require('express');
const app = express();
const port = 8000;
const path = require('path');
const userRoute = require('./routes/user')
const mongoose=require('mongoose');
const cookieParser = require('cookie-parser');
const {checkForAuthenticationCookie}= require('./middleware/authentication');
const blogRoute = require('./routes/blog');
const Blog = require('./models/blog');


app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
app.use(checkForAuthenticationCookie('token'))
app.use(express.static(path.resolve('./public')));

mongoose.connect('mongodb://127.0.0.1:27017/blogify').
then((e)=>console.log('mongoDB connected'));

app.set('view engine',"ejs");
app.set('views',path.resolve('./views'))

app.get('/',async(req,res)=>{
    const allBlogs = await Blog.find({});
    return res.render('home',{
        user:req.user,
        blogs:allBlogs
    });
})

app.use('/user',userRoute);
app.use('/blog',blogRoute);

app.listen(port,()=>console.log(`server started on port : ${port}`));