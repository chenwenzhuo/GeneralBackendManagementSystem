const http = require('http');

const PORT = 3007;

const app = http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World!!!\n');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
