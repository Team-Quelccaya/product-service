const pool = require('../db');
const fs = require('fs');

var readStream = fs.createReadStream('../db/photos.csv', {
  start: 0,
});
var currentString = '';

// This will wait until we know the readable stream is actually valid before piping
readStream.on('data', function (chunk) {
  // This just pipes the read stream to the response object (which goes to the client)
  currentString += chunk.toString();

  if (currentString.length > 10000) {
    commit();
  }
});

readStream.on('close', function () {
  commit();
});

function commit() {
  var lines = currentString.split('\n');
  currentString = lines.pop();
  console.log(`Inserting ${lines.length} rows...`);
  for (var i = 0; i < lines.length; i++) {
    if (i % 100 === 0) console.log(`[${i}] inserted`);
    var line = lines[i].split(',');
    const query = `
      INSERT INTO photos (style_id, url, thumbnail_url)
      VALUES (
        $1,
        $2,
        $3
      );
    `;

    pool.query(query, [line[1], line[2], line[3]]).catch((e) => {
      console.log(e);
    });
  }
}
