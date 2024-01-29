const {Router} = require('express');
const User= require('../models/user');
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
    try{
        const token =await User.matchPassword(email,password);
        return res.cookie('token',token).redirect('/');
    }catch(error){
        return res.render('signin',{
            error:'incorrect email or password'
        });
    }
    
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

router.get('/logout',(req,res)=>{
    res.clearCookie('token');
    return res.redirect('/');
})

module.exports =router;