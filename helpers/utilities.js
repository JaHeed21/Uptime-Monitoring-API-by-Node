/*
 * Title: Utilities
 * Description:  Important Utilities
 * Author: Jahid Rayhan
 * Date: 11/02/2026
 */

// dependencies
const crypto = require("crypto");
const environmentToExport = require("./environments");

//module Scafolding
const utilities = {};

//Parse JSON string to object
utilities.parseJSON = (jsonString) => {
  let output = {};
  try {
    output = JSON.parse(jsonString);
  } catch (error) {
    output = {};
  }
  return output;
};

// Hash String
utilities.hash = (str) => {
  if (typeof str === "string" && str.length > 0) {
    let hash = crypto
      .createHmac("sha256", environmentToExport.secretKey)
      .update(str)
      .digest("hex");
    return hash;
  } else {
    return false;
  }
};

//export environment
module.exports = utilities;
