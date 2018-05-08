var http = require('http');
http.createServer(function(req, res) {
    res.writeHead(200, {'Content-type': 'text/html'});
    res.write('<head><meta charset="utf-8" /></head>');
    res.write('<h2>你好呀</h2>');
    res.end('Thank you!');
}).listen(8888);