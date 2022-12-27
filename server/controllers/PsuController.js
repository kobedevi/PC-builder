const db = require("../utils/db");
const { validationResult } = require("express-validator");
const { v4: uuidv4 } = require("uuid");

class PsuController {
	fetchPsu = async (req, res, next) => {
		try {
			const results = await db.promise().query(`SELECT * FROM psu`);
			res.status(200).send(results[0]);
		} catch (e) {
			next(e);
		}
	};

	createPsu = async (req, res, next) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const {
			idManufacturer,
			idFormfactor,
			modelName,
			height,
			width,
			depth,
			wattage,
			modular,
		} = req.body;

		try {
			const manufacturer = await db
				.promise()
				.query(
					`select idManufacturer from manufacturers where idManufacturer = "${idManufacturer}"`
				);
			if (manufacturer[0].length === 0) {
				return res
					.status(400)
					.json({ message: "Given idManufacturer does not exist" });
			}
			const formfactor = await db
				.promise()
				.query(
					`select idFormfactor from formfactors where idFormfactor = "${idFormfactor}"`
				);
			if (formfactor[0].length === 0) {
				return res
					.status(400)
					.json({ message: "Given formfactor does not exist" });
			}
			const id = uuidv4();
			const sqlInsert =
				"INSERT INTO psu (idPsu, idManufacturer, idFormfactor, modelName, height, width, depth, wattage, modular) VALUES (?,?,?,?,?,?,?,?,?)";
			db.promise()
				.query(sqlInsert, [
					id,
					idManufacturer,
					idFormfactor,
					modelName,
					height,
					width,
					depth,
					wattage,
					modular,
				])
				.then(() => {
					res.status(201).send({
						message: "PSU added",
						id,
					});
				});
		} catch (e) {
			next(e.name && e.name === "ValidationError" ? new ValidationError(e) : e);
		}
	};
}

module.exports = PsuController;
