const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const routes = require('../server/routes/routes.js');

app.use(bodyParser.json());
app.get('/', (req, res) => res.send('Please specify routes'));
app.use('/', routes);

app.listen(4000, function () {
  console.log('listening on port 4000!');
});
