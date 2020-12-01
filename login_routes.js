const UserModel=require('./Models/UserModel')
const passport=require('passport')
const localStrategy=require('passport-local').Strategy;
const router=require('express').Router();
const jwt=require('jsonwebtoken')

router.get('/user', (req,res)=>{
    res.render('login')
})

router.post('/user', passport.authenticate('local', {failureRedirect:'/login/user', session:false}), (req,res)=>{
const token=jwt.sign({id:req.user._id}, 'process.env.JWT_SECRET')
res.status(200).send(` Successful Login, ${token}`)
})


passport.use(new localStrategy({usernameField:"email"}, async (email,password, done)=>{

    try{
        const foundUser = await UserModel.findOne({email});
        if(foundUser){
            if(foundUser.password==password){
              return done(null, foundUser)
            }
            
            else{
                console.log('invalid Credentials')
                return done(null, false)
        }
    }
    else{
        console.log('Egwa ekete, No found User')
        return done(null,false)
    }
        }
catch(error){
    console.log(error)
    return done(error, false)
}
})
)

module.exports=router