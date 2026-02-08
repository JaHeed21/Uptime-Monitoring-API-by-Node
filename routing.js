/*
 * Title: Routing
 * Description: Application Routing
 * Author: Jahid Rayhan
 * Date: 08/02/2026
 */

// dependencies
const { sampleHandler } = require("./handlers/routeHandlers/sampleHandler");

// module scafolding
const routes = {
    sample: sampleHandler,
};


module.exports = routes;