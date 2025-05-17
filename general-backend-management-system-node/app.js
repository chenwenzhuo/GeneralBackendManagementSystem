const express = require('express');

const PORT = 3007;
const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!!!\n');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
