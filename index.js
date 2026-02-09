/*
 * Title: Uptime Monitoring Application
 * Description: A RESTful API to monitor up or down time of user defined links
 * Author: Jahid Rayhan
 * Date: 07/02/2026
 */

// dependencies
const http = require("http");
const { handleReqRes } = require("./helpers/handleReqRes");
const environment = require("./helpers/environments");


// app object - module scafolding
const app = {};

// configuration
app.config = {
  PORT: 3000,
};

// create server
app.createSever = () => {
  const server = http.createServer(app.handleReqRes);
  server.listen(environment.port, () => {
    console.log(`Server listening on Port:${environment.port}`);
  });
};

//  handle request and Response
app.handleReqRes = handleReqRes;

// start server
app.createSever();
