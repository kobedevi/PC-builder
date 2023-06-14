const NotFoundError = require("../errors/NotFoundError");
const ValidationError = require("../errors/ValidationError");
const authRoutes = require("./authRoutes");
const builderRoutes = require("./builderRoutes");
const { authLocal, authJwt } = require("../services/auth/auth.services");
const { userModel } = require("../models/User");
const UserController = require("../controllers/UserController");
const userController = new UserController();

const registerRoutes = (app, db) => {
	// TODO: Register page
	app.post("/register", userModel, userController.register);
	app.post("/login", authLocal, userController.login);

	app.use(authJwt, authRoutes);
	app.use(builderRoutes);

	// default 404
	app.use(function (req, res, next) {
		next(new NotFoundError());
	});

	// error handler
	app.use(function (err, req, res, next) {
		res.status(err.statusCode || 500);
		res.json(err);
	});
};

module.exports = {
	registerRoutes,
};
