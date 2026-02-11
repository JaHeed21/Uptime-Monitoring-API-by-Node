/*
 * Title: Routing
 * Description: Application Routing
 * Author: Jahid Rayhan
 * Date: 08/02/2026
 */

// dependencies
const { sampleHandler } = require("./handlers/routeHandlers/sampleHandler");
const { userHandler } = require("./handlers/routeHandlers/userHandlers");

// module scafolding
const routes = {
  sample: sampleHandler,
  user: userHandler,
};

module.exports = routes;
