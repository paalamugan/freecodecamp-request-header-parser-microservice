// index.js
// where your node app starts

// init project
require('dotenv').config();
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));
app.set('trust proxy', true);
// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint...
app.get('/api/whoami', function (req, res) {
  const headers = req.headers;
  console.log("req.ip", req.ip)
  console.log("req.hostname", req.hostname)
  console.log("req.socket.remoteAddress", req.socket.remoteAddress)
  console.log("req.headers['x-forwarded-for']", req.headers['x-forwarded-for'])
  // console.log("headers", headers)
  res.json({ 
    ipaddress: req.ip, 
    language: headers['accept-language'], 
    software: headers['user-agent']
  });
});

// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
