// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

const Celebrity = require("../models/Celebrity.model");

// all your routes here
router.get("/celebrities/create", (req, res) =>
  res.render("celebrities/new-celebrity.hbs")
);

router.post("/celebrities/create", (req, res) => {
  //
  console.log("req.body", req.body);

  Celebrity.create(req.body)
    .then(() => res.redirect("/celebrities"))
    .catch((err) => console.log(err));
});

router.get("/celebrities", (req, res) => {
  Celebrity.find()
    .then((allCelebritiesFromDB) => {
      console.log("Retrieved Celebrities:", allCelebritiesFromDB);
      res.render("celebrities/celebrities.hbs", {
        celebrities: allCelebritiesFromDB,
      });
    })
    .catch((err) => console.log(err));
});

module.exports = router;
