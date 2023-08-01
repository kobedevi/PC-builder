const db = require("../utils/db");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
const { ROLES } = require("../utils/globals");
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
const SQL = require("@nearform/sql");

class UserController {
	login = async (req, res, next) => {
		const { user } = req;
		res.status(200).json({
			email: user.email,
			role: user.role,
			userName: user.userName,
			id: user._id,
			token: this.createToken(user),
		});
	};

	register = async (req, res, next) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		let user = req.body;
		user.role = ROLES.user;
		try {
			console.log('test')
			bcrypt.hash(user.password, 10, async function (err, hash) {
				if (err) {
					throw err;
				}
				(user.id = uuidv4()), (user.password = hash);
				const sqlInsert =
					"INSERT INTO users (idUsers, role, userName, password, email) VALUES (?,?,?,?,?)";
				const u = await db
					.promise()
					.query(sqlInsert, [
						user.id,
						user.role,
						user.userName,
						user.password,
						user.email,
					]);
				res.status(200).json(user);
			});
		} catch (e) {
			console.log(e);
			next(e.name && e.name === "ValidationError" ? new ValidationError(e) : e);
		}
	};

	fetchUserByMail = async (req, res, next) => {
		const { email } = req.body;
		try {
			const results = await db.promise().query(SQL`SELECT * FROM users
				WHERE email=${email} LIMIT 1;`);
			if (results[0].length === 0) {
				return null;
			}
			return results[0][0];
		} catch (e) {
			next(e);
		}
	};

	fetchUserById = async (req, res, next) => {
		const { idUsers } = req.body;
		try {
			const results = await db.promise().query(SQL`SELECT * FROM users
				WHERE idUsers=${idUsers} LIMIT 1;`);
			if (results[0].length === 0) {
				return null;
			}
			return results[0][0];
		} catch (e) {
			next(e);
		}
	};

	comparePassword = (password1, password2) => {
		return new Promise((resolve, reject) => {
			bcrypt.compare(password1, password2, (err, isMatch) => {
				if (isMatch) {
					resolve(true);
				} else {
					reject(err);
				}
			});
		});
	};

	createToken = (user) => {
		return jwt.sign({ idUsers: user.idUsers }, process.env.JWT_SECRET, {
			expiresIn: 60 * 120,
		});
	};

	isAdmin = (user) => {
		return user.role === roles.admin;
	};
}

module.exports = UserController;
