//---------------------------- require statements--------------------
const express = require("express");
const morgan = require("morgan")
const cors = require("cors")
const bodyParser = require("body-parser")
const uuid = require("uuid");
const openapi = require("@wesleytodd/openapi");
const _ = require("lodash");
const mongoose = require("mongoose")
var sha256 = require('js-sha256');
//----------------------- import mongoose models--------------------
const db = require("./models")

//-------server config-----------------------------------------------
const PORT = 8080;
const app = express()

app.use(morgan("tiny"));
app.use(bodyParser.json());
app.use(cors());

const { hydrateUser } = require("./lib/hydrators/user");
const { createUserToken } = require("./lib/jwtTokens");
//----------------------------Routing / route statements-------------
//login
app.post("/login", async (req,res)=>{
  const {email, password}= req.body

  // check to see if credential match
  db.User.findOne({email:email, password:sha256(password)}, (error, user)=>{
    if(!user){
      return res.status(401).json({ status: "Unauthorized" })
    }
    if(user){
      const authUser =  hydrateUser(user) 
      console.log(authUser)
      const {token, tokenExpires } = createUserToken({userInfo:{ uuid:authUser.uuid, email:authUser.email}})

    return  res.json({authUser,token,tokenExpires})
    }

  })
})

//signup
app.post("/signup", async (req,res)=>{
  const {email, password}= req.body
//define new user
  let newUser ={
    email:email,
    password:sha256(password),
    uuid: uuid.v4()
  }
  //check db to see if they exist
  db.User.findOne({email: newUser.email},(error, user)=>{
    if(error) throw error;
    if(user){
      console.log("user already exists")
      return res.json('user already exists');
    }
    if(!user){
      const insertedUser = new db.User(newUser)
      insertedUser.save((err)=>{
        if(err) throw(err);
        console.log("user saved")
        res.json({user:"saved"})
      })
    }
  })
  
})


//----------------------------connect to mongoose---------------------
mongoose
  .connect(process.env.MONGODB_URI || 'mongodb://mongo:27017/Auth', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .catch((error) => { 
    console.log('Error connecting to Mongoose -> ', error);
  });

mongoose.connection.once('open', () => {
  console.log('MongoDB Connected');
});

mongoose.connection.on('error', (err) => {
  console.log('Error staying connected to Mongoose -> ', err);
});
//----------------------------app listening---------------------------
app.listen(PORT, () => {
    console.log(`Cloud listening on ${PORT}`);
  });
  