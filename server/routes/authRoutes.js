const express = require('express');

const MovieController = require('../controllers/MovieController');
const ReviewController = require('../controllers/ReviewController');
const DirectorController = require('../controllers/DirectorController');
const LikedMovieController = require('../controllers/LikedMovieController');
const UserController = require('../controllers/UserController');
const { withRole } = require('../services/auth/auth.services');
const { roles } = require('../models/User');
const upload = require("../utils/multer");

const userController = new UserController();
const directorController = new DirectorController();
const movieController = new MovieController();
const reviewController = new ReviewController();
const likedMovieController = new LikedMovieController();

const authRouter = express.Router();
const adminRouter = express.Router();

// directors
authRouter.get('/directors', directorController.getDirectors); // overview
authRouter.get('/directors/:id', directorController.getDirectorById); // detail
authRouter.get('/directors/:id/movies', directorController.getMoviesByDirectorId); // detail
adminRouter.post('/directors', directorController.createDirector); // add
adminRouter.patch('/directors/:id', directorController.updateDirectorById); // update
adminRouter.delete('/directors/:id', directorController.deleteDirectorById); // delete
adminRouter.delete('/directors/:id/delete', directorController.deleteDirectorByIdAndMovies); // delete 

// Movies
authRouter.get('/movies/paginate/:page/:perPage', movieController.getMoviesPaginated); // overview
authRouter.get('/movies', movieController.getMovies); // overview
authRouter.get('/movies/filter/:query', movieController.getMoviesByFilter); // detail
authRouter.get('/movies/:id', movieController.getMovieById); // detail
adminRouter.post('/movies', movieController.createMovie); // add
adminRouter.patch('/movies/:id', movieController.updateMovieById); // update
adminRouter.delete('/movies/:id', movieController.deleteMovieById); // delete

// uploads
adminRouter.post('/uploads', upload.single('file') ,movieController.uploadImage);

// Reviews
authRouter.get('/movies/:id/reviews/:page/:perPage', reviewController.getReviewsPaginated);
authRouter.get('/movies/:id/reviews', reviewController.getReviewsByMovie);
authRouter.post('/movies/:id/reviews', reviewController.createReviewByMovie);
adminRouter.delete('/movies/reviews/:reviewid', reviewController.deleteReviewById);

// likedMovies
authRouter.get('/likedMovies', likedMovieController.getLikedMovies);
authRouter.post('/likedMovies', likedMovieController.createLikedMovie);
authRouter.delete('/likedMovies/:movieId', likedMovieController.deleteLikedMovieWithoutId);

// users
adminRouter.get('/users', userController.getUsers);
adminRouter.get('/users/filter/:query', userController.getUsersFiltered);
adminRouter.get('/users/paginate/:page/:perPage', userController.getUsersPaginated);
adminRouter.delete('/users/:id', userController.deleteUser);
adminRouter.patch('/users/:id', userController.updateUser);
authRouter.patch('/users', userController.updateSelf);
adminRouter.post('/users', userController.register);

authRouter.use(withRole(roles.admin), adminRouter);

module.exports = authRouter;