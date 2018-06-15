var http = require("http");
var url = require('url');
var port = process.argv[2];


function parsetime(time) 

{
  
  return {


    "Hour": time.getHours(),
    "Minute": time.getMinutes(),
    "Second": time.getSeconds()

  };

}

function unixtime(time) {
  
  return {
  
    "Unixtime": time.getTime()
  
  };

}

var Data = http.createServer(function(req, res) {

  

  var pURL = url.parse(req.url, true);

  var time = new Date(pURL.query.iso);

  var result;

  if (req.url.search('parsetime') != -1) {
    
    result = parsetime(time);

  } else if (req.url.search('unixtime') != -1) {
    
    result = unixtime(time);
  
  }

  if (result) {
  
    res.writeHead(200, {
  
      'Content-Type': 'application/json'
  
    });
  
    res.end(JSON.stringify(result));
  
  } else {
  
    res.writeHead(404);
  
    res.end();
  
  }

})

Data.listen(port);
