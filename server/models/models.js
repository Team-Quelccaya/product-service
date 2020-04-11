const pool = require('../../db');

module.exports = {
  getProductInfo: (id, cb) => {
    const infoText = 'SELECT * FROM product WHERE product_id = $1';
    const featureText =
      'SELECT feature, value FROM features WHERE product_id = $1';
    const value = [id];
    let product;

    pool
      .query(infoText, value)
      .then((res) => {
        product = res.rows[0];
      })
      .then(() => {
        pool
          .query(featureText, value)
          .then((res) => {
            product.features = res.rows;
          })
          .then(() => cb(null, product))
          .catch((err) => cb(err));
      })
      .catch((err) => {
        cb(err);
      });
  },
  getRelatedProducts: (id, cb) => {
    const text = 'SELECT * FROM related WHERE current_product_id = $1';
    const value = [id];
    pool
      .query(text, value)
      .then((res) => {
        let result = res.rows.map((row) => {
          return row.related_product_id;
        });
        cb(null, result);
      })
      .catch((err) => cb(err, null));
  },
};
