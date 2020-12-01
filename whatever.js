const passport=require('passport');
const router=require('express').Router();
const JWTStrategy=require('passport-jwt').Strategy;
const ExtractJwt=require('passport-jwt').ExtractJwt;

router.get('/user', passport.authenticate( 'jwt', {session:false, failureRedirect:'/login/user'}), (req,res)=>res.send('You made It'))



passport.use(new JWTStrategy({
    jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken,
    secretOrKey:process.env.JWT_SECRET
}, async (payload,done)=>{
    try{
        const foundUser = await  UserModel.findById(payload.id)
        if(foundUser){
            console.log(foundUser)
            return done(null, foundUser)
        }
        else{
            console.log('User Not Found')
            return done(null, false)
        }      
    }
    catch(err){
        console.log(err)
        return done(err, false)
    }
}))


module.exports = router