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

module.exports = router;
