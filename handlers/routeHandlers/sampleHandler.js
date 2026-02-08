/*
 * Title: Sample Handler
 * Description: Sample Handler
 * Author: Jahid Rayhan
 * Date: 08/02/2026
 */

// module scafolding
const handler = {};

handler.sampleHandler = (req, res) => {
  res.end("sample Handlers");
}

module.exports = handler;