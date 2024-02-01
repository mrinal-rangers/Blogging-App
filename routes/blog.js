const {Router} = require('express');
const router  = Router();
const multer  = require('multer');
const Blog= require('../models/blog')
const path = require('path');
const Comment = require('../models/comment')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve("./public/uploads"))
    },
    filename: function (req, file, cb) {
      const fileName = `${file.originalname}`;
      cb(null,fileName);
    }
  })
  
  const upload = multer({ storage: storage })
  

router.get('/add-new',(req,res)=>{
    return res.render('addBlog',{
        user:req.user
    });
})

router.post('/comment/:blogId',async(req,res)=>{
  await Comment.create({
    content:req.body.content,
    createdBy:req.user._id,
    blogId: req.params.blogId,
  });
  return res.redirect(`/blog/${req.params.blogId}`)
})

router.get('/:id',async(req,res)=>{
  const blog = await Blog.findById(req.params.id).populate('createdBy');
  const blogId = req.params.id;
  const comments = await Comment.find({blogId:blogId}).populate('createdBy');
  return res.render('blog',{
      user:req.user,
      blog:blog,
      comments:comments,
  });
})

router.post('/',upload.single('coverImage'),async(req,res)=>{
    const {title,body}= req.body;
    const blog = await Blog.create({
        body:body,
        title:title,
        createdBy:req.user._id,
        coverImageURL : `/uploads/${req.file.filename}`,
    })
    return res.redirect('/');
})



module.exports = router;