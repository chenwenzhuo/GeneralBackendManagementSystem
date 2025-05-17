const http = require('http');

const app = http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World!!!\n');
});

app.listen(3007, () => {
  console.log('Server is running on http://localhost:3007');
});
