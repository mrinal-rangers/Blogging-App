const {Router} = require('express');
const User= require('../models/user');
const { ArrowBackIosRounded } = require('@mui/icons-material');
const router = Router();

router.get('/',async(req,res)=>{
    const users = await User.find({});
    let arr=[] ;
    users.map((user)=>{
        const obj ={
            fullName : user.fullName ,
            email : user.email
        }
        arr = [...arr,obj]
    })
    return res.send(arr);
})

router.get('/signin',(req,res)=>{
    return res.render('signin');
})
router.post('/signin',async(req,res)=>{
    const {email,password} = req.body;
    const user =await User.matchPassword(email,password);
    console.log('user :',user);
    return res.redirect('/');
})
router.get('/signup',(req,res)=>{
    return res.render('signup');
})
router.post('/signup',async (req,res)=>{
    //console.log('post req was made on signup route')
    const {fullName,email,password} = req.body;
    await User.create({
        fullName,
        email,
        password
    });
    return res.redirect('/')
})

module.exports =router;