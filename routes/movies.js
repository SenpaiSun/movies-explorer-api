const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getMovies,
  addMovie,
  deleteMovie,
} = require('../controllers/movies');

router.get('/movies', getMovies);
router.post(
  '/movies',
  celebrate({
    body: Joi.object().keys({
      country: Joi.string().required(),
      director: Joi.string().required(),
      duration: Joi.number().required(),
      year: Joi.string().required(),
      description: Joi.string().required(),
      image: Joi.string().required().pattern(/^(http|https):\/\/(www\.)?[\w\-._~:/?#]+#?$/),
      trailerLink: Joi.string().required().pattern(/^(http|https):\/\/(www\.)?[\w\-._~:/?=&]+/),
      thumbnail: Joi.string().required().pattern(/^(http|https):\/\/(www\.)?[\w\-._~:/?#]+#?$/),
      owner: Joi.string().required(),
      movieId: Joi.number().required(),
      nameRU: Joi.string().required(),
      nameEN: Joi.string().required(),
    }),
  }),
  addMovie,
);
router.delete(
  '/movies/:movieId',
  celebrate({
    params: Joi.object().keys({
      movieId: Joi.number().required(),
    }),
  }),
  deleteMovie,
);

module.exports = router;
