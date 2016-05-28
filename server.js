'use strict';

const express = require('express');
const http = require('http');

// Constants
const PORT = 8080;

var options = {
  host: '169.254.169.254',
  port: 80,
  path: '/latest/meta-data/instance-id',
  method: 'GET'
};



// App
const app = express();
app.get('/', function (req, res) {
  try {
    http.request(options, function(res) {
      console.log('STATUS: ' + res.statusCode);
      console.log('HEADERS: ' + JSON.stringify(res.headers));
      res.setEncoding('utf8');
      res.on('data', function (chunk) {
        console.log('BODY: ' + chunk);
        res.send('instance-id: ' + chunk);
        res.send();
      });
    }).on('error', function(e) {
        console.log("error: " + e.message);
        res.send( "error: " + e.message);

    }).end();
  } catch (err) {
    console.log(err);
    res.send('Hello world\n');
  }
});

app.listen(PORT);
console.log('Running on http://localhost:' + PORT);
