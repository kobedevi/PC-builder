const LocalStrategy = require("passport-local");
const { User } = require("../../models/User");
const UserController = require("../../controllers/UserController");

const localStrategy = new LocalStrategy(
	{
		usernameField: "email",
	},
	async (email, password, done) => {
		try {
			const payload = {
				body: {
					email,
				},
			};
			const userController = new UserController();
			const user = await userController.fetchUserByMail(payload);
			if (user) {
				const check = await userController.comparePassword(
					password,
					user.password
				);
				if (check) {
					return done(null, user);
				}
			}
			return done(null, null);
		} catch (e) {
			return done(e, null);
		}
	}
);
module.exports = localStrategy;
