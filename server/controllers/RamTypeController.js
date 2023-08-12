const db = require("../utils/db");
const { validationResult } = require("express-validator");
const { v4: uuidv4 } = require("uuid");

class RamTypeController {
	fetchRamTypes = async (req, res, next) => {
		try {
			const results = await db.promise().query(`SELECT * FROM ramtypes
			WHERE deleted = 0
			ORDER BY ramType;`);
			return res.status(200).send(results[0]);
		} catch (e) {
			next(e);
		}
	};

	createRamTypes = (req, res, next) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		
		if (req.body.ramType) {
			const id = uuidv4();
			try {
				const sqlInsert =
					"INSERT INTO ramtypes (idRamType, ramType) VALUES (?,?)";
				db.promise()
					.query(sqlInsert, [id, req.body.ramType])
					.then(() => {
						return res.status(201).send({
							message: "RAM type added",
							id,
						});
					})
			} catch (e) {
				next(
					e.name && e.name === "ValidationError" ? new ValidationError(e) : e
				);
			}
		}
	};
}

module.exports = RamTypeController;
