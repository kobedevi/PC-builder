const db = require("../utils/db");
const { validationResult } = require("express-validator");
const { v4: uuidv4 } = require("uuid");
const SQL = require("@nearform/sql");

class CaseController {
	fetchCases = async (req, res, next) => {
		try {
			const results = await db.promise().query(`SELECT * FROM cases`);
			res.status(200).send(results[0]);
		} catch (e) {
			next(e);
		}
	};

	fetchCaseById = async (req, res, next) => {
		try {
			const { id } = req.params;
			const results = await db.promise()
				.query(SQL`SELECT cases.*, manufacturers.manufacturerName FROM cases
				LEFT JOIN manufacturers ON cases.idManufacturer = manufacturers.idManufacturer
				WHERE cases.idCase=${id} LIMIT 1;`);
			if (results[0].length === 0) {
				return res.status(400).json({ message: "Case does not exist" });
			}
			res.status(200).send(results[0]);
		} catch (e) {
			next(e);
		}
	};

	createCase = async (req, res, next) => {
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
			"2-5_slots": smallSlot,
			"3-5_slots": largeSlot,
		} = req.body;

		try {
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
					.json({ message: "Given formfactor does not exist" });
			}
			const idCase = uuidv4();
			const sqlInsert =
				"INSERT INTO cases (idCase, idManufacturer, idFormfactor, modelName, height, width, depth, `2-5_slots`, `3-5_slots`) VALUES (?,?,?,?,?,?,?,?,?)";
			db.promise()
				.query(sqlInsert, [
					idCase,
					idManufacturer,
					idFormfactor,
					modelName,
					height,
					width,
					depth,
					smallSlot,
					largeSlot,
				])
				.then(() => {
					res.status(201).send({
						message: "Case added",
						id: idCase,
					});
				});
		} catch (e) {
			next(e.name && e.name === "ValidationError" ? new ValidationError(e) : e);
		}
	};

	patchCaseById = async (req, res, next) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ 
				errors: errors.array(),
			});
		}

		const {
			idManufacturer,
			idFormfactor,
			modelName,
			height,
			width,
			depth,
			"2-5_slots": smallSlot,
			"3-5_slots": largeSlot,
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
			const sql = "UPDATE cases SET idManufacturer = ?, idFormfactor = ?, modelName = ?, height = ?, width = ?, depth = ?, `2-5_slots` = ?, `3-5_slots` = ? WHERE idCase = ?";
			let data = [
				idManufacturer,
				idFormfactor,
				modelName,
				height,
				width,
				depth,
				smallSlot,
				largeSlot,
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
}

module.exports = CaseController;
