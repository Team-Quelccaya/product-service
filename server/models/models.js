const pool = require('../../db');

module.exports = {
  getProductInfo: (id, cb) => {
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
      .catch((err) => {
        cb(err);
      });
  },
  getProductStyles: (id, cb) => {
    const stylesText = `
      SELECT
        style_id,
        name,
        original_price,
        sale_price,
        default_style 
      FROM styles
      WHERE product_id = $1`;
    const photosText = `
      SELECT 
        url, 
        thumbnail_url 
      FROM photos 
      WHERE style_id = $1`;
    const skusText = `
      SELECT 
        size, 
        quantity 
      FROM skus 
      WHERE style_id = $1`;
    const stylesValue = [id];

    let response = { product_id: id.toString(), results: [] };

    var styles = [];

    pool
      .query(stylesText, stylesValue)
      .then((res) => {
        styles = res.rows.map((style) => {
          style.style_id = Number(style.style_id);
          if (style.hasOwnProperty('default_style')) {
            style['default?'] = style.default_style;
            delete style.default_style;
          }
          if (style.sale_price === 'null') style.sale_price = '0';
          return style;
        });
        var photoPromises = styles.map((style) => {
          return pool.query(photosText, [style.style_id]);
        });

        return Promise.all(photoPromises);
      })
      .then((photosResults) => {
        var photos = photosResults.map((result) => result.rows);
        styles = styles.map((style, index) => {
          style.photos = photos[index].map((photo) => {
            return {
              thumbnail_url: photo.thumbnail_url,
              url: photo.url,
            };
          });
          return style;
        });

        var skusPromises = styles.map((style) => {
          return pool.query(skusText, [style.style_id]);
        });

        return Promise.all(skusPromises);
      })
      .then((skusResults) => {
        var skus = skusResults.map((result) => result.rows);
        styles = styles.map((style, index) => {
          style.skus = skus[index].reduce((prev, sku) => {
            prev[sku.size] = sku.quantity;
            return prev;
          }, {});
          return style;
        });
        response.results = styles;
        console.log(response);
        cb(null, response);
      })
      .catch((err) => {
        cb(err);
      });
  },
  getRelatedProducts: (id, cb) => {
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
      })
      .catch((err) => cb(err, null));
  },
};
