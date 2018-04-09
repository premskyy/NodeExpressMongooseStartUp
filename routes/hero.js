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
router.get('/:id', function (req, res, next) {
  Hero.findOne({ id: req.params.id }, (err, hero) => {
    if (err) return res.status(500).send(err);
    return res.status(200).send(hero);
  });
});
router.put('/', function (req, res, next) {
  Hero.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, function (err, doc) {
    if (err) return res.send(500, { error: err });
    return res.json({ status:"succesfully saved" });
  });
});
router.post('/', function (req, res, next) {
  const hero = new Hero(req.body);
  hero.save().then(() => res.json({ "name": req.body.name, id: req.body.id}));
});

router.delete('/:id', function (req, res, next) {
  console.log(req.params.id);
  Hero.findByIdAndRemove({_id: req.params.id}, (err, hero) => {
    if (err) return res.status(500).send(err);
    const response = {
      message: "Hero successfully deleted",
      id: hero.id
    };
    return res.status(200).send(response);
  });
});
module.exports = router;
