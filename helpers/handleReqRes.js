/*
 * Title: Handle Request Response
 * Description: Handle Request and Response
 * Author: Jahid Rayhan
 * Date: 08/02/2026
 */

//dependancies
const url = require("url");
const { StringDecoder } = require("string_decoder");
const routes = require("../routing");
const {
  notFoundHandler,
} = require("../handlers/routeHandlers/notFoundHandler");
const { parseJSON } = require("./utilities");
// module scafolding - handler object
const handler = {};

handler.handleReqRes = (req, res) => {
  // get the url and parse it
  // const parsedUrl = url.parse(req.url, true);
  const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
  const path = parsedUrl.pathname;
  const trimedPath = path.replace(/^\/+|\/+$/g, "");
  const method = req.method.toLowerCase();
  const queryStringObject = parsedUrl.searchParams;
  const requestHeaders = req.headers;

  const requestProperties = {
    parsedUrl,
    path,
    trimedPath,
    method,
    queryStringObject,
    requestHeaders,
    res,
  };

  const decoder = new StringDecoder("utf-8");
  let realData = "";

  const choosenHandler = routes[trimedPath] || notFoundHandler;

  req.on("data", (buffer) => {
    realData += decoder.write(buffer);
  });

  req.on("end", () => {
    realData += decoder.end();
    // requestProperties.body = realData;
    requestProperties.body = parseJSON(realData);

    choosenHandler(requestProperties, (statusCode, payload) => {
      statusCode = typeof statusCode === "number" ? statusCode : 500;
      payload = typeof payload === "object" ? payload : {};

      const payloadString = JSON.stringify(payload);
      if (!res.getHeader("Content-Type")) {
        res.setHeader("Content-Type", "application/json");
      }
      res.writeHead(statusCode);
      res.end(payloadString);
    });
  });
};

module.exports = handler;
