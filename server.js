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

    http.request(options, function(r) {
      console.log('STATUS: ' + res.statusCode);
      console.log('HEADERS: ' + JSON.stringify(res.headers));
      r.setEncoding('utf8');
      r.on('data', function (chunk) {
        console.log('BODY: ' + chunk);
        res.write('instance-id: ' + chunk + '\n');
        res.send();
      });
    }).on('error', function(e) {
        console.log("error: " + e.message);
        res.write( "error: " + e.message);
        res.send();
    }).end();

});

app.listen(process.env.PORT || PORT);
console.log('Running on http://localhost:' + PORT);
