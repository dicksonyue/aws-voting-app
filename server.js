'use strict';

const express = require('express');
const http = require('http');
var promise = require('promise');


// Constants
const PORT = 8080;
const METASVC = {
  host: '169.254.169.254', //'169.254.169.254',
  port: 80
}

var optionsinstance = {
  name: 'instance-id',
  host: METASVC.host,
  port: METASVC.port,
  path: '/latest/meta-data/instance-id',
  method: 'GET'
};

var optionszone = {
  name: 'availability-zone',
  host: METASVC.host,
  port: METASVC.port,
  path: '/latest/meta-data//placement/availability-zone',
  method: 'GET'
};
// App

function getMetaData(options){
    return new Promise(function(resolve, reject){
      http.request(options, function(r) {
        console.log('STATUS: ' + r.statusCode);
        console.log('HEADERS: ' + JSON.stringify(r.headers));
        r.setEncoding('utf8');
        r.on('data', function (data) {
          console.log('BODY: ' + data);
          var result = {};
          result[options.name] = data;
          resolve(result);
        });
      }).on('error', function(e) {
          console.log("error: " + e.message);
          reject(e);
      }).end();
    })
}


const app = express();
app.get('/', function (req, res) {
  var metaDataPromises = [getMetaData(optionsinstance), getMetaData(optionszone)];
  Promise.all(metaDataPromises).then(function(data){
    console.log(data) // logs ['dog1.png', 'dog2.png']
    res.write(JSON.stringify(data));
    res.send();
  }).catch(function(err){ // if any image fails to load, then() is skipped and catch is called
    console.log(err) // returns array of images that failed to load
    res.write(err);
    res.send();
  });
});

app.get('/latest/meta-data/instance-id', function (req, res) {
  res.write( "i-xxxxxxxx");
  res.send();
});
app.get('/latest/meta-data//placement/availability-zone', function (req, res) {
  res.write( "ap-northeast-x");
  res.send();
});

app.listen(process.env.PORT || PORT);
console.log('Running on http://localhost:' + PORT);
