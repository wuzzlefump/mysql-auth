module.exports = {
  port: 8080,
  jwt: {
    user: {
      secret: "supersecret",
      expiration: 3600 * 24 * 30, // one month
    },
  }
};
