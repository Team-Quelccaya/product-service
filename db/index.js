const { Client } = require('pg');
const config = require('../config');

const client = new Client(config);
const connection = client.connect();
module.exports = connection;
