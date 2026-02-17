/*
 * Title: User Handler
 * Description: Handler to handle user related routes
 * Author: Jahid Rayhan
 * Date: 11/02/2026
 */

//dependencies
const data = require("../../lib/data");
const { hash, parseJSON } = require("../../helpers/utilities");

// module scafolding
const handler = {};

handler.userHandler = (requestProperties, callback) => {
  const acceptedMethods = ["get", "post", "put", "delete"];

  if (acceptedMethods.indexOf(requestProperties.method) > -1) {
    handler._users[requestProperties.method](requestProperties, callback);
  } else {
    callback(405);
  }
};

handler._users = {};
handler._users.get = (requestProperties, callback) => {
  //chcek the phone number is valid or not
  const phone =
    typeof requestProperties.queryStringObject.phone === "string" &&
    requestProperties.queryStringObject.phone.trim().length === 11
      ? requestProperties.queryStringObject.phone.trim()
      : false;
      
      
  if (phone) {
    // lookup the user
    data.read("users", phone, (err, user) => {
      const userObject = {...parseJSON(user)};
      if (!err && userObject) {
        delete userObject.password;
        callback(200, userObject);
      } else {
        callback(404, {
          error: "User Object not found",
        });
      }
    });
  } else {
    callback(404, {
      error: "Problem with reading user object",
    });
  }
};

handler._users.post = (requestProperties, callback) => {
  const firstName =
    typeof requestProperties.body.firstName === "string" &&
    requestProperties.body.firstName.trim().length > 0
      ? requestProperties.body.firstName
      : false;
  const lastName =
    typeof requestProperties.body.lastName === "string" &&
    requestProperties.body.lastName.trim().length > 0
      ? requestProperties.body.lastName
      : false;
  const phone =
    typeof requestProperties.body.phone === "string" &&
    requestProperties.body.phone.trim().length === 11
      ? requestProperties.body.phone
      : false;
  const password =
    typeof requestProperties.body.password === "string" &&
    requestProperties.body.password.trim().length > 3
      ? requestProperties.body.password
      : false;
  const tosAgreement =
    typeof requestProperties.body.tosAgreement === "boolean" &&
    requestProperties.body.tosAgreement === true
      ? true
      : false;

  if (firstName && lastName && phone && password && tosAgreement) {
    // make sure that user does not already exists
    data.read("users", phone, (err) => {
      if (err) {
        let userObject = {
          firstName,
          lastName,
          phone,
          password: hash(password),
          tosAgreement,
        };
        // store the user to File System
        data.create("users", phone, userObject, (err) => {
          if (!err) {
            callback(200, {
              message: "User created successfully",
            });
          } else {
            callback(500, {
              error: "Could not create user",
            });
          }
        });
      } else {
        callback(500, {
          error: "User Alrady exists....",
        });
      }
    });
  }
};

handler._users.put = (requestProperties, callback) => {
  const phone =
    typeof requestProperties.body.phone === "string" &&
    requestProperties.body.phone.trim().length === 11
      ? requestProperties.body.phone
      : false;  
  
  const firstName =
    typeof requestProperties.body.firstName === "string" &&
    requestProperties.body.firstName.trim().length > 0
      ? requestProperties.body.firstName
      : false;
  const lastName =
    typeof requestProperties.body.lastName === "string" &&
    requestProperties.body.lastName.trim().length > 0
      ? requestProperties.body.lastName
      : false;
  const password =
    typeof requestProperties.body.password === "string" &&
    requestProperties.body.password.trim().length > 3
      ? requestProperties.body.password
      : false;
      
  if (phone) {
    if(firstName || lastName || password){
      // lookup the user
      data.read("users", phone, (err, uData) => {
        const userData = { ...parseJSON(uData) };
        if (!err && userData) {
          if (firstName) {
            userData.firstName = firstName;
          }
          if (lastName) {
            userData.lastName = lastName;
          }
          if (password) {
            userData.password = hash(password);
          }
          // store the user to File System
          data.update("users", phone, userData, (err) => {
            if (!err) {
              callback(200, {
                message: "User updated successfully",
              });
            } else {
              callback(500, {
                error: "Could not update user",
              });
            }
          });
        } else {
          callback(404, {
            error: "User Object not found",
          });
        }
      });
    }else{
      callback(400, {
        error: "Invalid Request. Problem with request parameters",
      });
    }
    
  }else{
    callback(400, {
      error: "Invalid Request. Phone Number is required",
    });
  }      
};

handler._users.delete = (requestProperties, callback) => {
  callback(200, {
    message: "This is User Delete url",
  });
};

module.exports = handler;
