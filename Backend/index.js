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
  const { email, password } = req.body;

  const userRecordList = await query({
    sql: `SELECT * FROM User WHERE email=? AND password=SHA2(?, 256)`,
    values: [email, password],
  });

  if (!userRecordList.length) {
    return res.status(401).json({ status: "Unauthorized" });
  }

  const userRecord = _.head(userRecordList);
  const user = await hydrateUser(userRecord);

  const { token, tokenExpires } = createUserToken({
    userInfo: { uuid: user.uuid, email: user.email },
  });

  const out = { user, token, tokenExpires };

  return res.json(out);
})

//signup
app.post("/signup", async (req,res)=>{
  const { email, password } = req.body;

  const userRecordList = await query({
    sql: `SELECT * FROM User WHERE email=? AND password=SHA2(?, 256)`,
    values: [email, password],
  });

  if (!userRecordList.length) {
    await query({
      sql:`INSERT INTO User SET uuid=?, email=?, password=SHA2(?, 256)  `,
      values:[uuid.v4(), email, password ]
    })
    return(res.status(200).json({status:"made new user"}) )
  }else{
    return res.status(401).json({ status: "User already exists" });
  }

})


//----------------------------app listening---------------------------
app.listen(PORT, () => {
    console.log(`Cloud listening on ${PORT}`);
  });
  