const express = require('express');
const app = express();

const PORT = 8080;

const VERSION = process.env.APP_VERSION || '1.0';

app.get('/', (req, res) => {
  res.send(`Aplikasi Demo!!!!!!!!!! Versi: ${VERSION}`);
});

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}, Versi ${VERSION}`);
});
