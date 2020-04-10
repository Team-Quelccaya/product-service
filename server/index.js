const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.get('/', (req, res) => res.send('Hello World!'));

app.listen(3000, function () {
  console.log('listening on port 3000!');
});
