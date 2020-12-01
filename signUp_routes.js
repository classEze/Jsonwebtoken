const router=require('express').Router();
const UserModel=require('./Models/UserModel')

router.get('/user', (req,res)=> res.render('form'))

router.post('/user', (req,res)=>{
    UserModel.create(req.body).then(result=>res.send(result)).catch(err=>res.send(err))
    })
module.exports=router;
