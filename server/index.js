const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const routes = require('./routes/routes.js');

app.use(bodyParser.json());
app.get('/', (req, res) => res.send('Please specify routes'));
app.get('/loaderio-08d6f1d97ec95abc300e484f2c30fcf0', (req, res) =>
  res.send('loaderio-08d6f1d97ec95abc300e484f2c30fcf0')
);
app.use('/', routes);

app.listen(4000, function () {
  console.log('listening on port 4000!');
});
