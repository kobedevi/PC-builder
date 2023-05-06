const db = require("../utils/db");
const { validationResult } = require("express-validator");
const { v4: uuidv4 } = require("uuid");
const SQL = require("@nearform/sql");

class RamController {
	fetchRam = async (req, res, next) => {
		try {
			const results = await db.promise().query(`SELECT * FROM ram`);
			res.status(200).send(results[0]);
		} catch (e) {
			next(e);
		}
	};

	fetchRamById = async (req, res, next) => {
		try {
			const { id } = req.params;
			const results = await db.promise()
				.query(SQL`SELECT ram.*, manufacturers.manufacturerName FROM ram
				LEFT JOIN manufacturers ON ram.idManufacturer = manufacturers.idManufacturer
				WHERE ram.idRam=${id} LIMIT 1;`);
			if (results[0].length === 0) {
				return res.status(400).json({ message: "RAM does not exist" });
			}
			res.status(200).send(results[0]);
		} catch (e) {
			next(e);
		}
	};

	patchRamById = async (req, res, next) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ 
				errors: errors.array(),
			});
		}

		const {
			idManufacturer,
			modelName,
			sizePerStick,
			stickAmount,
			speed,
			type
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
			const sql = "UPDATE ram SET idManufacturer = ?, modelName = ?, sizePerStick = ?, stickAmount = ?, speed = ?, type = ? WHERE idRam = ?";
			let data = [
				idManufacturer,
				modelName,
				sizePerStick,
				stickAmount,
				speed,
				type,
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

	createRam = async (req, res, next) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const {
			idManufacturer,
			modelName,
			sizePerStick,
			stickAmount,
			speed,
			type,
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

			const idRam = uuidv4();
			const sqlInsert =
				"INSERT INTO ram (idRam, idManufacturer, modelName, sizePerStick, stickAmount, speed, type) VALUES (?,?,?,?,?,?,?)";
			db.promise()
				.query(sqlInsert, [
					idRam,
					idManufacturer,
					modelName,
					sizePerStick,
					stickAmount,
					speed,
					type,
				])
				.then(() => {
					res.status(201).send({
						message: "Ram added",
						id: idRam,
					});
				});
		} catch (e) {
			next(e.name && e.name === "ValidationError" ? new ValidationError(e) : e);
		}
	};
}

module.exports = RamController;
