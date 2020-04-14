const model = require('../models/models.js');

module.exports = {
  getListProducts: (req, res) => {
    model.getListProducts(req.query, (err, results) => {
      if (err) {
        console.error(err);
        res.sendStatus(500);
      } else {
        res.send(results);
      }
    });
  },
  getProductInfo: (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    model.getProductInfo(req.params.product_id, (err, results) => {
      if (err) {
        console.error(err);
        res.sendStatus(500);
      } else {
        res.send(results);
      }
    });
  },
  getProductStyles: (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    model.getProductStyles(req.params.product_id, (err, results) => {
      if (err) {
        console.error(err);
        res.sendStatus(500);
      } else {
        res.send(results);
      }
    });
  },
  getRelatedProducts: (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    model.getRelatedProducts(req.params.product_id, (err, results) => {
      if (err) {
        console.error(err);
        res.sendStatus(500);
      } else {
        res.send(results);
      }
    });
  },
};
