const mongoose=require('mongoose')
const express=require('express')
const app=express();
require('dotenv').config();
const port=process.env.PORT || 5050
const passport=require('passport')


//SET UP HANDLE BARS
const handlebars= require('express-handlebars');
app.set('view engine', 'hbs')
app.engine('hbs', handlebars
({
    defaultLayout:'main',
    layoutsDir:__dirname +'/views/layouts',
    partialsDir:__dirname+'/views/partials',
    extname:'hbs'
}))


//MIDDLEWARES
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(passport.initialize())


//CONNECT MONGOOSE
mongoose.connect('mongodb://localhost/JWTFinally', {useCreateIndex:true, useUnifiedTopology:true, useNewUrlParser:true})
.then(()=>{
    console.log('Connected DB')
    app.listen(port,'localhost', ()=>console.log(` Server listening to requests on ${port}`)) 
}
    )
.catch(err=>console.log(err))


//SET UP ROUTES
app.get('/', (req,res)=>res.render('home'))

app.use('/protected', require('./whatever'))

app.use('/signup', require('./signUp_routes'))

app.use('/login', require('./login_routes'))

app.use((req,res,next)=> res.status(404).send(' Error: No page found'))

app.use((error,req,res,next)=> res.status(500).send(' Error: Internal Server Error'))





