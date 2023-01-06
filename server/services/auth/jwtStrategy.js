const { ExtractJwt, Strategy } = require("passport-jwt");
const UserController = require("../../controllers/UserController");
const { User } = require("../../models/User");
const db = require("../../utils/db");

const jwtOptions = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: process.env.JWT_SECRET,
};

const jwtStrategy = new Strategy(jwtOptions, async (payload, done) => {
	try {
		const userController = new UserController();
		const user = userController.fetchUserById();
		// const user = await .findById(payload._id);
		if (!user) {
			return done(null, false);
		}
		return done(null, user);
	} catch (e) {
		return done(e, false);
	}
});

module.exports = jwtStrategy;
