/*
 * Title: Sample Handler
 * Description: Sample Handler
 * Author: Jahid Rayhan
 * Date: 08/02/2026
 */

// module scafolding
const handler = {};

handler.sampleHandler = (requestProperties, callback) => {
  callback(200, { name: "sample handler" });
}

module.exports = handler;