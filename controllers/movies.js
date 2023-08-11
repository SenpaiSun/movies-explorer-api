const NotFoundError = require('../errors/NotFoundError');
const ConflictError = require('../errors/ConflictError');
const Movie = require('../models/movie');

module.exports.getMovies = (req, res, next) => {
  const userId = req.user._id;
  Movie.find({ owner: userId })
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
    .catch((err) => {
      if (err.code === 11000) {
        return next(new ConflictError('Данный фильм уже добавлен!'));
      }
      return next(err);
    });
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findOneAndRemove({
    movieId: req.params.movieId,
    owner: req.user._id,
  })
    .then((movie) => {
      if (!movie) {
        return next(new NotFoundError('Данный фильм не найден в вашей коллекции'));
      }
      return res.send(movie);
    })
    .catch(next);
};
