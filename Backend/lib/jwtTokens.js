const jwt = require("jwt-simple");
const moment = require("moment");

const config = require("../configuration");

const createUserToken = ({ userInfo }) => {
  const exp = moment().add(config.jwt.user.expiration, "second").valueOf();

  const token = jwt.encode(
    {
      sub: JSON.stringify(userInfo),
      iat: Date.now(),
      exp,
    },
    config.jwt.user.secret
  );

  return { token, tokenExpires: exp };
};

const verifyAndDecodeUserToken = ({ token }) => {
  const decoded = jwt.decode(token, config.jwt.user.secret);
  const userInfo = JSON.parse(decoded.sub);
  return userInfo;
};

module.exports = { createUserToken, verifyAndDecodeUserToken };
