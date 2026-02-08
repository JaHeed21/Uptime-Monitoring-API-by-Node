/*
 * Title: Uptime Monitoring Application
 * Description: A RESTful API to monitor up or down time of user defined links
 * Author: Jahid Rayhan
 * Date: 07/02/2026
 */

// dependencies
const http = require("http");
const url = require("url");

// app object - module scafolding
const app = {};

// configuration
app.config = {
  PORT: 3000,
};

// create server
app.createSever = () => {
  const server = http.createServer(app.handleReqRes);
  server.listen(app.config.PORT, () => {
    console.log(`Server listening on Port:${app.config.PORT}`);
  });
};

//  handle request and Response
app.handleReqRes = (req, res) => {
  // get the url and parse it
  //   const parsedUrl = url.parse(req.url, true);
  const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
  const path = parsedUrl.pathname;
  const trimedPath = path.replace(/\/$/, "");
  console.log(trimedPath);

  res.end("Hello Programmers  ");
};

// start server
app.createSever();
