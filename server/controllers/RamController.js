const db = require("../utils/db");
const { validationResult } = require("express-validator");
const { v4: uuidv4 } = require("uuid");

class RamController {
	fetchRam = async (req, res, next) => {
		try {
			const results = await db.promise().query(`SELECT * FROM ram
			LEFT JOIN manufacturers ON ram.idManufacturer = manufacturers.idManufacturer
			LEFT JOIN ramtypes ON ram.idRamType = ramtypes.idRamType
			WHERE ram.deleted = 0;`);
			res.status(200).send(results[0]);
		} catch (e) {
			next(e);
		}
	};

	fetchRamByBuild = async (req, res, next) => {
		try {
			const {slots, id} = req.params;
			const userQuery = `SELECT * FROM ram
			LEFT JOIN manufacturers ON ram.idManufacturer = manufacturers.idManufacturer
			LEFT JOIN ramtypes ON ram.idRamType = ramtypes.idRamType
			WHERE ${slots !== 'undefined' ? 'ram.stickAmount <= ? AND ram.deleted = 0' : 'ram.deleted = 0'}
			AND ram.idRamType = ?
			ORDER BY idRam;`;
			const [rows] = await db.promise().query(userQuery, (slots !== 'undefined' ? [slots, id] : [id]));
			res.status(200).send(rows);
		} catch (e) {
			next(
				e.name && e.name === "ValidationError" ? new ValidationError(e) : e
			);
		}
	};

	fetchRamByFilter = async (req, res, next) => {
		try {
			let { query } = req.params;
			let encodedStr = query.replace(/\%/g,"Percent");
			encodedStr = query.replace(/[/^#\%]/g,"")
			encodedStr = encodedStr.replace(/[\u00A0-\u9999<>\&]/gim, i => '&#'+i.charCodeAt(0)+';')

			const userQuery = `SELECT * FROM ram
			LEFT JOIN manufacturers ON ram.idManufacturer = manufacturers.idManufacturer
			LEFT JOIN ramtypes ON ram.idRamType = ramtypes.idRamType
			WHERE CONCAT_WS('', modelName, manufacturerName, speed, ramType, sizePerStick) LIKE ?
			AND ram.deleted = 0;`;
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

	deleteRamById = async (req, res, next) => {
		try {
			const { id } = req.params;

			let query = `SELECT * FROM ram WHERE ram.idRam= ? LIMIT 1;`;
			let [rows] = await db.promise().query(query, [id]);
			if (rows.length === 0) {
				return res.status(400).json({ message: "Ram does not exist" });
			}
			query = `UPDATE ram SET deleted = 1 WHERE idRam= ?`;
			await db.promise().query(query, [id]);
			res.status(200).send(rows[0]);
		} catch (e) {
			next(e);
		}
	};

	fetchRamById = async (req, res, next) => {
		try {
			const { id } = req.params;
			const userQuery = `SELECT ram.*, manufacturers.manufacturerName, ramtypes.ramType FROM ram
			LEFT JOIN manufacturers ON ram.idManufacturer = manufacturers.idManufacturer
			LEFT JOIN ramtypes ON ram.idRamType = ramtypes.idRamType
			WHERE ram.idRam= ? AND ram.deleted = 0 LIMIT 1;`;
			const [rows] = await db.promise().query(userQuery, [id]);
			if (rows.length === 0) {
				return res.status(400).json({ message: "RAM does not exist" });
			}
			res.status(200).send(rows[0]);
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
			idRamType,
			image
		} = req.body;
		try {
			const { id } = req.params;
			let userQuery = `select idManufacturer from manufacturers where idManufacturer =  ?;`;
			let [rows] = await db.promise().query(userQuery, [idManufacturer]);
			if (rows.length === 0) {
				return res.status(400).json({ message: "Given idManufacturer does not exist" });
			}
			userQuery = `select idRamType from ramtypes where idRamType = ?;`;
			[rows] = await db.promise().query(userQuery, [idRamType]);
			if (rows.length === 0) {
				return res.status(400).json({ message: "Given idRamType does not exist" });
			}
			const sql = "UPDATE ram SET idManufacturer = ?, modelName = ?, sizePerStick = ?, stickAmount = ?, speed = ?, idRamType = ?, image = ? WHERE idRam = ?";
			let data = [
				idManufacturer,
				modelName,
				sizePerStick,
				stickAmount,
				speed,
				idRamType,
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

	createRam = async (req, res, next) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const {
			idManufacturer,
			idRamType,
			modelName,
			sizePerStick,
			stickAmount,
			speed,
			image
		} = req.body;
		

		try {
			let userQuery = `select idManufacturer from manufacturers where idManufacturer =  ?;`;
			let [rows] = await db.promise().query(userQuery, [idManufacturer]);
			if (rows.length === 0) {
				return res.status(400).json({ message: "Given idManufacturer does not exist" });
			}
			userQuery = `select idRamType from ramtypes where idRamType = ?;`;
			[rows] = await db.promise().query(userQuery, [idRamType]);
			if (rows.length === 0) {
				return res.status(400).json({ message: "Given idRamType does not exist" });
			}		

			const idRam = uuidv4();
			const sqlInsert =
				"INSERT INTO ram (idRam, idManufacturer, modelName, sizePerStick, stickAmount, speed, idRamType, image) VALUES (?,?,?,?,?,?,?,?)";
			db.promise()
				.query(sqlInsert, [
					idRam,
					idManufacturer,
					modelName,
					sizePerStick,
					stickAmount,
					speed,
					idRamType,
					image
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
