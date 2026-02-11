/*
 * Title: User Handler
 * Description: Handler to handle user related routes
 * Author: Jahid Rayhan
 * Date: 11/02/2026
 */

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
  callback(200, {
    message: "This is User Get url",
  });
};
handler._users.post = (requestProperties, callback) => {
  callback(200, {
    message: "This is User Post url",
  });
};
handler._users.put = (requestProperties, callback) => {
  callback(200, {
    message: "This is User Put url",
  });
};
handler._users.delete = (requestProperties, callback) => {
  callback(200, {
    message: "This is User Delete url",
  });
};

module.exports = handler;
