const db = require("../utils/db");
const { validationResult } = require("express-validator");
const ValidationError = require("../errors/ValidationError");
const { v4: uuidv4 } = require("uuid");

class FormfactorController {
	fetchFormfactors = async (req, res, next) => {
		try {
			const results = await db
				.promise()
				.query(`SELECT * FROM formfactors ORDER BY formfactor`);
			res.status(200).send(results[0]);
		} catch (e) {
			next(e);
		}
	};

	createFormfactor = (req, res, next) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		if (req.body.formfactor) {
			const id = uuidv4();
			try {
				const { formfactor, height, width } = req.body;
				const sqlInsert =
					"INSERT INTO formfactors (idFormfactor, formfactor, height, width) VALUES (?, ?, ?, ?)";
				db.promise()
					.query(sqlInsert, [id, formfactor, height, width])
					.then(() => {
						res.status(201).send({
							message: "Formfactor added",
							id,
						});
					});
			} catch (e) {
				next(
					e.name && e.name === "ValidationError" ? new ValidationError(e) : e
				);
			}
		}
	};
}

module.exports = FormfactorController;
