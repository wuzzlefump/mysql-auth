const _ = require("lodash");

const { query } = require("../database");

module.exports.hydrateUser = async (record) => {
  record.uuid = record.uuid.toString();

  // remove id
  delete record.id;

  // remove password
  delete record.password;

  return record;
};