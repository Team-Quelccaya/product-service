const model = require('../models/models.js');

module.exports = {
  getListProducts: (req, res) => {
    model.getListProducts(req.params.id, (err, results) => {
      if (err) {
        console.error(err);
        res.sendStatus(500);
      } else {
        console.log(results);
        res.send(results);
      }
    });
  },
  getProductInfo: (req, res) => {
    model.getProductInfo(req.params.id, (err, results) => {
      if (err) {
        console.error(err);
        res.sendStatus(500);
      } else {
        console.log(results);
        res.send(results);
      }
    });
  },
  getProductStyles: (req, res) => {
    model.getProductInfo(req.params.id, (err, results) => {
      if (err) {
        console.error(err);
        res.sendStatus(500);
      } else {
        console.log(results);
        res.send(results);
      }
    });
  },
  getRelatedProducts: (req, res) => {
    model.getProductInfo(req.params.id),
      (err, results) => {
        if (err) {
          console.error(err);
          res.sendStatus(500);
        } else {
          console.log(results);
          res.send(results);
        }
      };
  },
};
