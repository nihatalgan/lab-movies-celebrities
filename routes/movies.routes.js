// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

const Celebrity = require("../models/Celebrity.model");
const Movie = require("../models/Movie.model");

// all your routes here
router.get("/movies/create", (req, res) => {
  Celebrity.find()
    .then((allCelebritiesFromDB) => {
      res.render("movies/new-movie.hbs", {
        celebrities: allCelebritiesFromDB,
      });
    })
    .catch((error) => {
      console.log("Error while getting the celebrities from the DB: ", error);
      next(error);
    });
});

router.post("/movies/create", (req, res) => {
  //
  console.log("req.body", req.body);

  Movie.create(req.body)
    .then(() => res.redirect("/movies"))
    .catch((err) => console.log(err));
});

router.get("/movies", (req, res) => {
  Movie.find()
    .then((allMoviesFromDB) => {
      console.log("Retrieved Movies:", allMoviesFromDB);
      res.render("movies/movies.hbs", {
        movies: allMoviesFromDB,
      });
    })
    .catch((error) => {
      console.log("Error while getting the movies from the DB: ", error);
      next(error);
    });
});

router.get("/movies/:movieId", (req, res) => {
  const { movieId } = req.params;
  console.log(movieId);

  Movie.findById(movieId)
    .populate("cast")
    .then((movie) => {
      console.log("movie", movie);
      res.render("movies/movie-details", movie);
    })
    .catch((error) => {
      console.log("Error while getting the movies from the DB: ", error);
      next(error);
    });
});

router.post("/movies/:id/delete", (req, res, next) => {
  //
  Movie.findByIdAndDelete(req.params.id)
    .then(() => res.redirect("/movies"))
    .catch((err) => console.log(err));
});

module.exports = router;
