const db = require("../utils/db");
const { validationResult } = require("express-validator");
const ValidationError = require("../errors/ValidationError");
const { v4: uuidv4 } = require("uuid");

class CpuSocketController {
	fetchCpuSockets = async (req, res, next) => {
		try {
			const results = await db
				.promise()
				.query(`SELECT * FROM cpusockets ORDER BY socketType`);
			res.status(200).send(results[0]);
		} catch (e) {
			next(e);
		}
	};

	createCpuSocket = (req, res, next) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		if (req.body.socketType) {
			const id = uuidv4();
			try {
				const sqlInsert =
					"INSERT INTO cpusockets (idCpuSocket, socketType) VALUES (?,?)";
				db.promise().query(sqlInsert, [id, req.body.socketType]);
				res.status(201).send({
					message: "CPU socket added",
					id,
				});
			} catch (e) {
				next(
					e.name && e.name === "ValidationError" ? new ValidationError(e) : e
				);
			}
		}
	};
}

module.exports = CpuSocketController;
