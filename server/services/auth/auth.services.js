const passport = require("passport");
const AuthError = require("../../errors/AuthError");
const ForbiddenError = require("../../errors/ForbiddenError");
const localStrategy = require("./localStrategy");
const jwtStrategy = require("./jwtStrategy");

passport.use("local", localStrategy);
passport.use("jwt", jwtStrategy);

const passportWithErrorHandling = (strategy) => {
	return function (req, res, next) {
		passport.authenticate(strategy, { session: false }, function (err, user) {
			if (err) {
				return next(err);
			}
			if (!user) {
				return next(new AuthError());
			} else {
				req.user = user;
				return next();
			}
		})(req, res, next);
	};
};

const authLocal = passportWithErrorHandling("local");
const authJwt = passportWithErrorHandling("jwt");

const withRole = (roles) => (req, res, next) => {
	const user = req.user;
	if (roles.includes(user.role)) {
		next();
	} else {
		next(new ForbiddenError());
	}
};

module.exports = {
	authLocal,
	authJwt,
	withRole,
};
