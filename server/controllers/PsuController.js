const db = require("../utils/db");
const { validationResult } = require("express-validator");
const { v4: uuidv4 } = require("uuid");
const SQL = require("@nearform/sql");

class PsuController {
	fetchPsu = async (req, res, next) => {
		try {
			const results = await db.promise().query(SQL`SELECT * FROM psu
			WHERE deleted = 0;`);
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
				WHERE psu.idPsu=${id} 
				AND deleted = 0
				LIMIT 1;`);
			if (results[0].length === 0) {
				return res.status(400).json({ message: "PSU does not exist" });
			}
			res.status(200).send(results[0]);
		} catch (e) {
			next(e);
		}
	};

	fetchPsuByFilter = async (req, res, next) => {
		try {
			let { query } = req.params;
			let encodedStr = query.replace(/\%/g,"Percent");
			encodedStr = query.replace(/[/^#\%]/g,"")
			encodedStr = encodedStr.replace(/[\u00A0-\u9999<>\&]/gim, i => '&#'+i.charCodeAt(0)+';')

			const userQuery = `SELECT * FROM psu
			LEFT JOIN manufacturers ON psu.idManufacturer = manufacturers.idManufacturer
			WHERE CONCAT_WS('', modelName, manufacturerName, modular, wattage) LIKE ?
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

	fetchPsusByBuild = async(req, res, next) => {
		try {
			const { wattage } = req.params;
			const userQuery = `SELECT * FROM psu
			LEFT JOIN manufacturers ON psu.idManufacturer = manufacturers.idManufacturer
			WHERE psu.wattage >= ?
			AND psu.deleted = 0
			ORDER BY wattage;`;
			const [rows] = await db.promise().query(userQuery, [wattage]);
			res.status(200).send(rows);
		} catch (e) {
			next(
				e.name && e.name === "ValidationError" ? new ValidationError(e) : e
			);
		}
	}

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
			image
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
			const sql = "UPDATE Psu SET idManufacturer = ?, modelName = ?, modular = ?, idFormfactor = ?, wattage = ?, height = ?, width = ?, depth = ?, image = ? WHERE idPsu = ?";
			let data = [
				idManufacturer,
				modelName,
				modular,
				idFormfactor,
				wattage,
				height,
				width,
				depth,
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
			image
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
				"INSERT INTO psu (idPsu, idManufacturer, idFormfactor, modelName, height, width, depth, wattage, modular, image) VALUES (?,?,?,?,?,?,?,?,?,?)";
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
					image
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

	deletePsuById = async (req, res, next) => {
		try {
			const { id } = req.params;

			let query = `SELECT * FROM psu WHERE idPsu = ? LIMIT 1;`;
			let [rows] = await db.promise().query(query, [id]);
			if (rows.length === 0) {
				return res.status(400).json({ message: "PSU does not exist" });
			}
			query = `UPDATE psu SET deleted = 1 WHERE idPsu = ?;`;
			await db.promise().query(query, [id]);
			res.status(200).send(rows[0]);
		} catch (e) {
			next(e);
		}
	};
}

module.exports = PsuController;
