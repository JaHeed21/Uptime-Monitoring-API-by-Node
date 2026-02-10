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
const data  = require('./lib/data');


// app object - module scafolding
const app = {};

// configuration
app.config = {
  PORT: 3000,
};

//testing file system

// data.create('New', 'test', 
//     {'countryName': 'Bangladesh', 'language': 'Bangla', 'capital': 'Dhaka', 'currency': 'Taka'},
//     (err)=>{
//         console.log(err);
//     }
// )

// data.read('New', 'test', (err, data)=>{
//     console.log(err, data);
// })

data.update('New', 'test', 
    {'countryName': 'Bangladesh', 'language': 'English', 'capital': 'Dhaka', 'currency': 'Taka'},
    (err)=>{
        console.log(err);
    }
)


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
