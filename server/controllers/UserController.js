const db = require("../utils/db");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
const { ROLES, ROLESARRAY } = require("../utils/globals");
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");

class UserController {
	login = async (req, res, next) => {
		const { user } = req;
		res.status(200).json({
			email: user.email,
			role: user.role,
			userName: user.userName,
			idUser: user.idUsers,
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
			next(e.name && e.name === "ValidationError" ? new ValidationError(e) : e);
		}
	};

	createUser = async (req, res, next) => {
		try {
			const user = req.body;
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
			next(e.name && e.name === "ValidationError" ? new ValidationError(e) : e);
		}
	};

	fetchUserByMail = async (req, res, next) => {
		const { email } = req.body;
		try {
			const results = await db.promise().query(`SELECT * FROM users
				WHERE email= ? LIMIT 1;`, [email]);
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
			const results = await db.promise().query(`SELECT * FROM users
				WHERE idUsers= ? LIMIT 1;`,[idUsers]);
			if (results[0].length === 0) {
				return null;
			}
			return results[0][0];
		} catch (e) {
			next(e);
		}
	};

	deleteUserById = async (req, res, next) => {
		const { id } = req.params;
		const { user } = req;
		try {
			if(user.role === ROLES.superAdmin){
				const userQuery = await db.promise().query(`Select * FROM users WHERE idUsers= ?;`, [id]);
				await db.promise().query(`DELETE FROM users WHERE idUsers= ?;`, [id]);
				return res.status(200).send(userQuery[0][0]);
			}
			return res.status(400).send(results);
		} catch (e) {
			next(e);
		}
	};

	fetchUsers = async (req, res, next) => {
		try {
			const { user } = req;
			const { page=Math.abs(page) || 0, perPage=20 } = req.params;
			if(user.role === ROLES.superAdmin){
				let pageAmount = await db.promise().query("SELECT COUNT(idUsers) as totalProducts FROM users")
				.then(res => Math.ceil(res[0][0].totalProducts / perPage))

				const userQuery = `SELECT idUsers, email, userName, role FROM users ORDER BY email LIMIT ? OFFSET ?;`
				let [rows] = await db.promise().query(userQuery, [parseInt(perPage), parseInt(page*perPage)]);
				return res.status(200).send({results: rows, pageAmount});
			}
			return res.status(400).send({errors: "Access denied"});
		} catch (e) {
			next(e.name && e.name === "ValidationError" ? new ValidationError(e) : e);
		}
	};

	fetchUsersByFilter = async (req, res, next) => {
		try {
			const { query } = req.params;
			let encodedStr = query.replace(/\%/g,"Percent");
			encodedStr = query.replace(/[/^#\%]/g,"")
			encodedStr = encodedStr.replace(/[\u00A0-\u9999<>\&]/gim, i => '&#'+i.charCodeAt(0)+';')

			const userQuery = `SELECT idUsers, email, userName, role FROM users
			WHERE CONCAT_WS('', email, userName, role) LIKE ?
			ORDER BY email;`;
			const [rows] = await db.promise().query(userQuery, [`%${encodedStr}%`]);

			if (rows.length === 0) {
				return res.status(200).json({ 
					message: "No results",
					encodedStr,
				});
			}

			res.status(200).send(rows);
		} catch (e) {
			next(
				e.name && e.name === "ValidationError" ? new ValidationError(e) : e
			);
		}
	};

	patchUserById = async (req, res, next) => {
		try {
			const { user } = req;
			const { id } = req.params;
			const { email, userName, role } = req.body;
			if(user.role === ROLES.superAdmin){
				const userQuery = `UPDATE users SET email = ?, userName = ?, role = ? WHERE idUsers = ?;`;
				let [rows] = await db.promise().query(userQuery,[email, userName, ROLESARRAY.includes(role) ? role : ROLES.user, id]);
				return res.status(200).send(rows);
			}
			return res.status(400).send({errors: "Access denied"});
		} catch (e) {
			next(e.name && e.name === "ValidationError" ? new ValidationError(e) : e);
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
}

module.exports = UserController;
