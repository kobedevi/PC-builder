const db = require("../utils/db");
const { validationResult } = require("express-validator");
const { v4: uuidv4 } = require("uuid");
const SQL = require("@nearform/sql");

class CaseController {
	fetchCases = async (req, res, next) => {
		try {
			const results = await db.promise().query(`SELECT * FROM cases
			LEFT JOIN manufacturers ON cases.idManufacturer = manufacturers.idManufacturer
			LEFT JOIN formfactors ON cases.idFormfactor = formfactors.idFormfactor
			WHERE deleted = 0;`);
			res.status(200).send(results[0]);
		} catch (e) {
			next(e);
		}
	};

	fetchCasesByBuild = async (req, res, next) => {
		try {
			const { width, height, depth } = req.params;
			const userQuery = `SELECT * FROM cases
			LEFT JOIN manufacturers ON cases.idManufacturer = manufacturers.idManufacturer
			LEFT JOIN formfactors ON cases.idFormfactor = formfactors.idFormfactor
			WHERE cases.width >= ?
			AND cases.height >= ?
			AND cases.DEPTH >= ?
			AND cases.deleted = 0
			ORDER BY idCase;`;
			const [rows] = await db.promise().query(userQuery, [width,height,depth]);

			res.status(200).send(rows);
		} catch (e) {
			next(
				e.name && e.name === "ValidationError" ? new ValidationError(e) : e
			);
		}
	};

	fetchCasesByFilter = async (req, res, next) => {
		try {
			let { query } = req.params;
			let encodedStr = query.replace(/\%/g,"Percent");
			encodedStr = query.replace(/[/^#\%]/g,"")
			encodedStr = encodedStr.replace(/[\u00A0-\u9999<>\&]/gim, i => '&#'+i.charCodeAt(0)+';')

			const userQuery = `SELECT * FROM cases
			LEFT JOIN manufacturers ON cases.idManufacturer = manufacturers.idManufacturer
			LEFT JOIN formfactors ON cases.idFormfactor = formfactors.idFormfactor
			WHERE CONCAT_WS('', modelName, manufacturerName, formfactor) LIKE ?
			AND deleted = 0;`;
			let [rows] = await db.promise().query(userQuery, [`%${encodedStr}%`]);
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

	fetchCaseById = async (req, res, next) => {
		try {
			const { id } = req.params;
			const results = await db.promise()
				.query(SQL`SELECT cases.*, manufacturers.manufacturerName FROM cases
				LEFT JOIN manufacturers ON cases.idManufacturer = manufacturers.idManufacturer
				WHERE cases.idCase=${id} AND deleted = 0 LIMIT 1;`);
			if (results[0].length === 0) {
				return res.status(400).json({ message: "Case does not exist" });
			}
			res.status(200).send(results[0][0]);
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
			smallBay: smallSlot,
			largeBay: largeSlot,
			image
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
				"INSERT INTO cases (idCase, idManufacturer, idFormfactor, modelName, height, width, depth, `2-5_slots`, `3-5_slots`, image) VALUES (?,?,?,?,?,?,?,?,?,?)";
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
					image,
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
			smallBay: smallSlot,
			largeBay: largeSlot,
			image,
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
			const sql = "UPDATE cases SET idManufacturer = ?, idFormfactor = ?, modelName = ?, height = ?, width = ?, depth = ?, `2-5_slots` = ?, `3-5_slots` = ?, image = ? WHERE idCase = ?";
			let data = [
				idManufacturer,
				idFormfactor,
				modelName,
				height,
				width,
				depth,
				smallSlot,
				largeSlot,
				image,
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

	deleteCaseById = async (req, res, next) => {
		try {
			const { id } = req.params;

			let query = `SELECT * FROM cases WHERE idCase = ? LIMIT 1;`;
			let [rows] = await db.promise().query(query, [id]);
			if (rows.length === 0) {
				return res.status(400).json({ message: "RAM does not exist" });
			}
			query = `UPDATE cases SET deleted = 1 WHERE idCase = ?;`;
			await db.promise().query(query, [id]);
			res.status(200).send(rows[0]);
		} catch (e) {
			next(e);
		}
	};
}

module.exports = CaseController;
