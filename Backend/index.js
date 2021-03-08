//---------------------------- require statements--------------------
const express = require("express");
const morgan = require("morgan")
const cors = require("cors")
const bodyParser = require("body-parser")
const uuid = require("uuid");
const openapi = require("@wesleytodd/openapi");
const _ = require("lodash");
var sha256 = require('js-sha256');
//----------------------- import Mysql orm--------------------

const {query} = require("./lib/database");

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

})

//signup
app.post("/signup", async (req,res)=>{

})


//----------------------------connect to mysql---------------------

//----------------------------app listening---------------------------
app.listen(PORT, () => {
    console.log(`Cloud listening on ${PORT}`);
  });
  