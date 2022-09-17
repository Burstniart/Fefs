const http = require('http');

http.createServer(function (req, res) {
  res.write('Hello, Monika!');
  res.end();
}).listen(8080);

console.log('We\'re all set! Check port 8080~!');


