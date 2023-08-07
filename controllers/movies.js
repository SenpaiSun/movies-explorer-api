const NotFoundError = require('../errors/NotFoundError');
const Movie = require('../models/movie');

module.exports.getMovies = (req, res, next) => {
  Movie.find({})
    .then((movie) => res.send(movie))
    .catch(next);
};

module.exports.addMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner: req.user._id,
  })
    .then((movie) => res.send(movie))
    .catch(next);
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findOneAndRemove({
    movieId: req.params.movieId,
  })
    .then((movie) => {
      if (!movie) {
        return next(new NotFoundError('Фильм с указанным movieId не найден'));
      }
      if (movie.owner.toString() !== req.user._id) {
        return next(new NotFoundError('У вас этого фильма нет!'));
      }
      return res.send(movie);
    })
    .catch(next);
};
