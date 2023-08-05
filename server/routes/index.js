const NotFoundError = require("../errors/NotFoundError");
const ValidationError = require("../errors/ValidationError");
const authRoutes = require("./authRoutes");
const builderRoutes = require("./builderRoutes");
const authBuilderRoutes = require("./authBuilderRoutes");
const { authLocal, authJwt } = require("../services/auth/auth.services");
const { userModel } = require("../models/User");

const UserController = require("../controllers/UserController");
const BuildController = require("../controllers/BuildController");
const buildController = new BuildController();
const userController = new UserController();

const registerRoutes = (app, db) => {
	app.post("/register", userModel, userController.register);
	app.post("/login", authLocal, userController.login);
	app.get('/build/:id', buildController.fetchBuildById);
	app.get('/featured/builds', buildController.fetchFeaturedBuilds);

	app.use('/compatible', builderRoutes);
	app.use(authJwt, authBuilderRoutes);
	app.use(authJwt, authRoutes);

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
