/*
 * Title: Not Found Handler
 * Description: Not Found Handler
 * Author: Jahid Rayhan
 * Date: 09/02/2026
 */

// module scafolding
const handler = {};

handler.notFoundHandler = (req, res) => {
  res.end("Not Found");
}

module.exports = handler;