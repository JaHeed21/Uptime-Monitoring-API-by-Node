/*
 * Title: Handle Request Response
 * Description: Handle Request and Response 
 * Author: Jahid Rayhan
 * Date: 08/02/2026
 */

//dependancies
const url = require("url");
const { StringDecoder } = require("string_decoder");

// module scafolding - handler object
const hander = {};

hander.handleReqRes = (req, res) => {
  // get the url and parse it
  // const parsedUrl = url.parse(req.url, true);
  const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
  const path = parsedUrl.pathname;
  const trimedPath = path.replace(/\/$/, "");
  const method = req.method.toLowerCase();
  const queryStringObject = parsedUrl.searchParams;

  const decoder = new StringDecoder('utf-8');
  let realData = '';

  req.on('data',(buffer)=>{
    realData += decoder.write(buffer);
  })

  req.on('end', ()=>{
    decoder.end();
    console.log(realData);
  })

  res.end("Hello Programmers.");
}

module.exports = hander;