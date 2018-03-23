var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/hero');

const Hero = mongoose.model('Hero', { id: Number, name: String });

router.get('/', function(req, res, next) {
  Hero.find(function (err, heros) {
    if (err) return console.error(err);
    console.log(heros);
    res.json(heros)
  })
});
router.post('/', function (req, res, next) {
  const hero = new Hero(req.body);
  hero.save().then(() => res.json({ "name": req.body.name, id: req.body.id}));
});
module.exports = router;
