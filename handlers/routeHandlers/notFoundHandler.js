/*
 * Title: Not Found Handler
 * Description: 404 Not Found Handler
 * Author: Jahid Rayhan
 * Date: 09/02/2026
 */

// module scafolding
const handler = {};

handler.notFoundHandler = (requestProperties, callback) => {
  callback(404, { message: "request Not Found" });
}

module.exports = handler;