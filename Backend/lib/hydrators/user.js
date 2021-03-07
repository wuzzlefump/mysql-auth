const _ = require("lodash");


module.exports.hydrateUser = (record) => {
  
//   record.uuid = record.uuid.toString();

//   // remove id
//   delete record._id;

//   // remove password
//   delete record.password;
let newRecord ={
    email:record.email,
    uuid:record.uuid,
}
//   console.log(newRecord)
  return newRecord;
};