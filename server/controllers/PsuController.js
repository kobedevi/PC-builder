const db = require("../utils/db");
const { validationResult } = require("express-validator");
const { v4: uuidv4 } = require("uuid");
const SQL = require("@nearform/sql");

class PsuController {
	fetchPsu = async (req, res, next) => {
		try {
			const results = await db.promise().query(SQL`SELECT * FROM psu;`);
			res.status(200).send(results[0]);
		} catch (e) {
			next(e);
		}
	};

	fetchPsuById = async (req, res, next) => {
		try {
			const { id } = req.params;
			const results = await db.promise()
				.query(SQL`SELECT psu.*, manufacturers.manufacturerName FROM psu
				LEFT JOIN manufacturers ON psu.idManufacturer = manufacturers.idManufacturer
				WHERE psu.idPsu=${id} LIMIT 1;`);
			if (results[0].length === 0) {
				return res.status(400).json({ message: "RAM does not exist" });
			}
			res.status(200).send(results[0]);
		} catch (e) {
			next(e);
		}
	};

	patchPsuById = async (req, res, next) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ 
				errors: errors.array(),
			});
		}

		const {
			idManufacturer,
			modelName,
			modular,
			idFormfactor,
			wattage,
			height,
			width,
			depth,
		} = req.body;
		try {
			const { id } = req.params;
			const manufacturer = await db
				.promise()
				.query(
					SQL`select idManufacturer from manufacturers where idManufacturer = ${idManufacturer}`
				);
			if (manufacturer[0].length === 0) {
				return res
					.status(400)
					.json({ message: "Given idManufacturer does not exist" });
			}
			const formfactor = await db
				.promise()
				.query(
					SQL`select idFormfactor from formfactors where idFormfactor = ${idFormfactor}`
				);
			if (formfactor[0].length === 0) {
				return res
					.status(400)
					.json({ message: "Given idFormfactor does not exist" });
			}
			const sql = "UPDATE Psu SET idManufacturer = ?, modelName = ?, modular = ?, idFormfactor = ?, wattage = ?, height = ?, width = ?, depth = ? WHERE idPsu = ?";
			let data = [
				idManufacturer,
				modelName,
				modular,
				idFormfactor,
				wattage,
				height,
				width,
				depth,
				id,
			];
		
			db.promise()
			.query(sql, data)
			.then(() => {
				res.status(201).send({
					message: "Case updated",
					id,
				});
			});

		} catch (e) {
			next(e.name && e.name === "ValidationError" ? new ValidationError(e) : e);
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
