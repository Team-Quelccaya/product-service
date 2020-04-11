const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const routes = require('../server/routes/routes.js');

app.use(bodyParser.json());
app.get('/', (req, res) => res.send('Hello World!'));
app.use('/', routes);

app.listen(3000, function () {
  console.log('listening on port 3000!');
});
