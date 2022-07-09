const express = require("express");
const router = express.Router();
const Celebrity = require("../models/celebrity");

router.get("/celebrities", function (req, res, next) {
  console.log("XXXXXXXXXXXXXXX   ALEX LA REGARDE   XXXXXXXXXXXXXXXXX");
  Celebrity.find()
    .then(function (celebritiesFromDB) {
      console.log("celebrities from DB:", celebritiesFromDB); // [ {_id: , title: , ... }, ... ]
      res.render("celebrities", {
        celebrities: celebritiesFromDB,
      });
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
});

router.get("/celebrities/new", function (req, res, next) {
  res.render("celebrities/new", {});
});

router.post("/celebrities/new", function (req, res, next) {
  const { name, occupation, catchPhrase } = req.body;
  console.log(name, occupation, catchPhrase);
  Celebrity.create({
    name: name,
    occupation: occupation,
    catchPhrase: catchPhrase,
  })
    .then(function (celebritiesFromDB) {
      // { _id: '', title: , description:  }
      console.log("enregistrement creee", celebritiesFromDB);

      // res.send("ok");
      res.redirect("/celebrities");
    })
    .catch((err) => {
      console.log("oops, create d un livre", err);
      next(err);
    });
});

router.post("/celebrities/:id/remove", function (req, res, next) {
  Celebrity.findByIdAndRemove(req.params.id)
    .then(function () {
      res.redirect("/celebrities");
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
});

router.get("/celebrities/:id", (req, res, next) => {
  Celebrity.findById(req.params.id)
    .then((celebrityFromDB) => {
      res.render("celebrities/show", celebrityFromDB);
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
});

module.exports = router;
