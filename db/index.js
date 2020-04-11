const { Pool } = require('pg');
const config = require('../config');

const pool = new Pool(config);
// const connection = pool.connect();

module.exports = pool;
