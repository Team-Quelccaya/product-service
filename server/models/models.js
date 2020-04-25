const pool = require('../../db');
const client = require('../../db/redis');

module.exports = {
  getProductInfo: (id, cb) => {
    client.get(`product:${id}`, (err, reply) => {
      if (err) cb(err);
      if (reply === null) {
        const infoText = `
        SELECT 
          * 
        FROM product 
        WHERE product_id = $1`;
        const featureText = `
        SELECT 
          feature, value 
        FROM features 
        WHERE product_id = $1`;

        const value = [id];
        let product;

        pool
          .query(infoText, value)
          .then((res) => {
            let result = res.rows[0];
            if (result.hasOwnProperty('product_id')) {
              result['id'] = Number(result.product_id);
              delete result.product_id;
            }
            product = result;
          })
          .then(() => pool.query(featureText, value))
          .then((res) => {
            product.features = res.rows;
          })
          .then(() => cb(null, product))
          .then(() => {
            client.setex(`product:${id}`, 10, JSON.stringify(product));
          })
          .catch((err) => {
            cb(err);
          });
      } else {
        cb(null, reply);
      }
    });
  },
  getProductStyles: (id, cb) => {
    client.get(`styles:${id}`, (err, reply) => {
      if (err) cb(err);
      if (reply === null) {
        const text = `
        SELECT 
          s.product_id, 
          s.style_id, 
          s.name, 
          s.original_price, 
          s.sale_price, 
          s.default_style, 
          f.photo_id, 
          f.thumbnail_url, 
          f.url, 
          k.sku_id, 
          k.size, 
          k.quantity
        FROM styles s
        JOIN photos f
        ON s.style_id = f.style_id
        JOIN skus k
        ON s.style_id = k.style_id
        WHERE s.product_id= $1`;

        const value = [id];
        let response = { product_id: id.toString(), results: [] };
        let storage = {};
        let photos = [];
        let photo = {};

        pool
          .query(text, value)
          .then((res) => {
            res.rows.map((row) => {
              if (storage.style_id === undefined) {
                storage.style_id = row.style_id;
                storage.name = row.name;
                storage.original_price = row.original_price;
                if (row.sale_price === 'null') {
                  storage.sale_price = '0';
                } else {
                  storage.sale_price = row.sale_price;
                }
                storage['default?'] = row.default_style;
                storage.skus = {};
                storage.skus[row.size] = row.quantity;
                photo.photo_id = row.photo_id;
                photo.url = row.url;
                photo.thumbnail_url = row.thumbnail_url;
              }

              if (
                storage.style_id !== undefined &&
                storage.style_id !== row.style_id
              ) {
                storage.style_id = Number(storage.style_id);
                storage.photos = photos;
                response.results.push(storage);
                storage = {};
                photos = [];
                photo = {};
                storage.style_id = row.style_id;
                storage.name = row.name;
                storage.orginal_price = row.orginal_price;
                if (row.sale_price === 'null') {
                  storage.sale_price = '0';
                } else {
                  storage.sale_price = row.sale_price;
                }
                storage['default?'] = row.default_style;
                storage.skus = {};
                storage.skus[row.size] = row.quantity;
              }

              if (photo.photo_id !== row.photo_id) {
                photo.photo_id = row.photo_id;
                photo.url = row.url;
                photo.thumbnail_url = row.thumbnail_url;
                let result = {
                  url: photo.url,
                  thumbnail_url: photo.thumbnail_url,
                };
                photos.push(result);
              }

              if (storage.style_id === row.style_id) {
                storage.skus[row.size] = row.quantity;
              }
            });
          })
          .then(() => {
            cb(null, response);
          })
          .then(() => {
            client.setex(`styles:${id}`, 10, JSON.stringify(response));
          })
          .catch((err) => cb(err));
      } else {
        cb(null, reply);
      }
    });
  },
  getRelatedProducts: (id, cb) => {
    client.get(`related:${id}`, (err, reply) => {
      if (err) cb(err);
      if (reply === null) {
        const text = `
        SELECT 
          * 
        FROM related 
        WHERE current_product_id = $1`;
        const value = [id];
        pool
          .query(text, value)
          .then((res) => {
            let result = res.rows.map((row) => {
              return row.related_product_id;
            });
            cb(null, result);
            client.setex(`related:${id}`, 10, JSON.stringify(result));
          })
          .catch((err) => cb(err));
      } else {
        cb(null, reply);
      }
    });
  },
};
