const db = require("../utils/db");
const { validationResult } = require("express-validator");
const { v4: uuidv4 } = require("uuid");

class RamController {
	fetchRam = async (req, res, next) => {
		try {
			const { page=Math.abs(page) || 0, perPage=20} = req.params;
			let pageAmount = await db.promise().query("SELECT COUNT(idRam) as totalProducts FROM ram WHERE deleted = 0")
			.then(res => {
				return (Math.ceil(res[0][0].totalProducts / perPage))
			})
			const results = await db.promise().query(`SELECT * FROM ram
			LEFT JOIN manufacturers ON ram.idManufacturer = manufacturers.idManufacturer
			LEFT JOIN ramtypes ON ram.idRamType = ramtypes.idRamType
			WHERE ram.deleted = 0
			LIMIT ? OFFSET ?;`, [parseInt(perPage), parseInt(page*perPage)]);
			return res.status(200).send({result: results[0], pageAmount});
		} catch (e) {
			next(e);
		}
	};

	fetchRamByBuild = async (req, res, next) => {
		try {
			const {slots, id, page=Math.abs(page) || 0, perPage=20} = req.params;
			
			let pageAmount = await db.promise().query("SELECT COUNT(idRam) as totalProducts FROM ram WHERE deleted = 0")
			.then(res => {
				return (Math.ceil(res[0][0].totalProducts / perPage))
			})

			const userQuery = `SELECT * FROM ram
			LEFT JOIN manufacturers ON ram.idManufacturer = manufacturers.idManufacturer
			LEFT JOIN ramtypes ON ram.idRamType = ramtypes.idRamType
			WHERE ${slots !== 'undefined' ? 'ram.stickAmount <= ? AND ram.deleted = 0' : 'ram.deleted = 0'}
			AND ram.idRamType = ?
			ORDER BY idRam
			LIMIT ? OFFSET ?;`;

			const [rows] = await db.promise().query(userQuery, (slots !== 'undefined' ? [slots, id, parseInt(perPage), parseInt(page*perPage)] : [id, parseInt(perPage), parseInt(page*perPage)]));
			return res.status(200).send({result: rows, pageAmount});
		} catch (e) {
			next(
				e.name && e.name === "ValidationError" ? new ValidationError(e) : e
			);
		}
	};

	fetchRamByBuildFilter = async (req, res, next) => {
		try {
			const {slots, id, query} = req.params;
			let encodedStr = query.replace(/\%/g,"Percent");
			encodedStr = query.replace(/[/^#\%]/g,"")
			encodedStr = encodedStr.replace(/[\u00A0-\u9999<>\&]/gim, i => '&#'+i.charCodeAt(0)+';')

			const userQuery = `SELECT * FROM ram
			LEFT JOIN manufacturers ON ram.idManufacturer = manufacturers.idManufacturer
			LEFT JOIN ramtypes ON ram.idRamType = ramtypes.idRamType
			WHERE ${slots !== 'undefined' ? 'ram.stickAmount <= ? AND ram.deleted = 0' : 'ram.deleted = 0'}
			AND ram.idRamType = ?
			AND CONCAT_WS('', modelName, manufacturerName, speed, ramType, sizePerStick) LIKE ?
			ORDER BY idRam;`;
			const [rows] = await db.promise().query(userQuery, (slots !== 'undefined' ? [slots, id, `%${encodedStr}%`] : [id, `%${encodedStr}%`]));

			if (rows.length === 0) {
				return res.status(200).json({ 
					message: "No results",
					encodedStr,
				});
			}

			return res.status(200).send(rows);
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
			return res.status(200).send(rows);
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
			return res.status(200).send(rows[0]);
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
			return res.status(200).send(rows[0]);
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
			price,
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
			const sql = "UPDATE ram SET idManufacturer = ?, modelName = ?, sizePerStick = ?, stickAmount = ?, speed = ?, idRamType = ?, price = ?, image = ? WHERE idRam = ?";
			let data = [
				idManufacturer,
				modelName,
				sizePerStick,
				stickAmount,
				speed,
				idRamType,
				price,
				image,
				id,
			];
		
			db.promise()
			.query(sql, data)
			.then(() => {
				return res.status(201).send({
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
			price,
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
				"INSERT INTO ram (idRam, idManufacturer, modelName, sizePerStick, stickAmount, speed, idRamType, price, image) VALUES (?,?,?,?,?,?,?,?,?)";
			db.promise()
				.query(sqlInsert, [
					idRam,
					idManufacturer,
					modelName,
					sizePerStick,
					stickAmount,
					speed,
					idRamType,
					price,
					image
				])
				.then(() => {
					return res.status(201).send({
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
