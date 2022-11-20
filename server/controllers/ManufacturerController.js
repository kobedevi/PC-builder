const db = require("../utils/db");
const { validationResult } = require("express-validator");
const ValidationError = require("../errors/ValidationError");
const { v4: uuidv4 } = require("uuid");

class ManufacturerController {
	fetchManufacturers = async (req, res, next) => {
		try {
			const results = await db
				.promise()
				.query(`SELECT * FROM manufacturers ORDER BY manufacturerName`);
			res.status(200).send(results[0]);
		} catch (e) {
			next(e);
		}
	};

	createManufacturer = (req, res, next) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { manufacturerName } = req.body;
		if (manufacturerName) {
			const id = uuidv4();
			try {
				const sqlInsert =
					"INSERT INTO manufacturers (idManufacturer,manufacturerName) VALUES (?,?)";
				db.promise().query(sqlInsert, [id, manufacturerName]);
				res.status(201).send({
					message: "Manufacturer added",
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

module.exports = ManufacturerController;
