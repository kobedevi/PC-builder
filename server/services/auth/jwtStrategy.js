const { ExtractJwt, Strategy } = require("passport-jwt");
const UserController = require("../../controllers/UserController");
const db = require("../../utils/db");

const jwtOptions = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: process.env.JWT_SECRET,
};

const jwtStrategy = new Strategy(jwtOptions, async (payload, done) => {
	try {
		const userController = new UserController();
		const sender = {
			body: {
				idUsers: payload.idUsers,
			},
		};
		const user = await userController.fetchUserById(sender);
		if (!user) {
			return done(null, false);
		}
		return done(null, user);
	} catch (e) {
		return done(e, false);
	}
});

module.exports = jwtStrategy;
