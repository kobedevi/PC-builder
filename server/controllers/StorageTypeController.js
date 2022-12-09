const db = require("../utils/db");
const { validationResult } = require("express-validator");
const ValidationError = require("../errors/ValidationError");
const { v4: uuidv4 } = require("uuid");

class StorageTypeController {
	fetchStorageTypes = async (req, res, next) => {
		try {
			const results = await db.promise().query(`SELECT * FROM storagetypes`);
			res.status(200).send(results[0]);
		} catch (e) {
			next(e);
		}
	};

	createStorageTypes = (req, res, next) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		if (req.body.storageType) {
			const id = uuidv4();
			try {
				const sqlInsert =
					"INSERT INTO storagetypes (idStorageType, storageType) VALUES (?,?)";
				db.promise()
					.query(sqlInsert, [id, req.body.storageType])
					.then(() => {
						res.status(201).send({
							message: "Storage type added",
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

module.exports = StorageTypeController;
