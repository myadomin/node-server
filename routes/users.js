var express = require('express');
var db = require('../db/index.js');
var router = express.Router();

router.get('/getCity', function(req, res, next) {
  db.query('SELECT * FROM `city` WHERE ID < 3', function (error, rows) {
    res.json(rows);
  });
});

module.exports = router;
