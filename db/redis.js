const redis = require('redis');
const client = redis.createClient(6379, process.env.REDIS);
client.on('connect', function () {
  console.log('connected');
});
client.on('error', function (err) {
  console.log('Error ' + err);
});

module.exports = client;
