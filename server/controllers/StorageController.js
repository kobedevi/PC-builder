const db = require("../utils/db");
const { validationResult } = require("express-validator");
const ValidationError = require("../errors/ValidationError");
const { v4: uuidv4 } = require("uuid");

class StorageController {
	fetchStorage = async (req, res, next) => {
		try {
			const results = await db.promise().query(`SELECT *, manufacturers.manufacturerName, storageTypes.storageType FROM storage
			LEFT JOIN manufacturers ON storage.idManufacturer = manufacturers.idManufacturer
			LEFT JOIN storagetypes ON storage.idStorageType = storagetypes.idStorageType
			WHERE storage.deleted = 0`);
			res.status(200).send(results[0]);
		} catch (e) {
			next(e);
		}
	};

	fetchStorageByFilter = async (req, res, next) => {
		try {
			let { query } = req.params;
			let encodedStr = query.replace(/\%/g,"Percent");
			encodedStr = query.replace(/[/^#\%]/g,"")
			encodedStr = encodedStr.replace(/[\u00A0-\u9999<>\&]/gim, i => '&#'+i.charCodeAt(0)+';')

			const userQuery = `SELECT *, manufacturers.manufacturerName, storageTypes.storageType FROM storage
			LEFT JOIN manufacturers ON storage.idManufacturer = manufacturers.idManufacturer
			LEFT JOIN storagetypes ON storage.idStorageType = storagetypes.idStorageType
			WHERE CONCAT_WS('', modelName, manufacturerName, capacity, RPM) LIKE ?
			AND storage.deleted = 0;`;
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

	fetchStorageById = async (req, res, next) => {
		try {
			const { id } = req.params;
			const results = await db.promise()
				.query(`SELECT storage.*, manufacturers.manufacturerName, storageTypes.storageType FROM storage
				LEFT JOIN manufacturers ON storage.idManufacturer = manufacturers.idManufacturer
				LEFT JOIN storagetypes ON storage.idStorageType = storagetypes.idStorageType
				WHERE storage.idStorage = ? AND storage.deleted = 0 LIMIT 1;`, [id]);
			if (results[0].length === 0) {
				return res.status(400).json({ message: "Storage does not exist" });
			}
			res.status(200).send(results[0]);
		} catch (e) {
			console.log(e);
			next(e);
		}
	};

	deleteStorageById = async (req, res, next) => {
		try {
			const { id } = req.params;
			let query = `SELECT * FROM storage WHERE storage.idStorage= ? LIMIT 1;`;
			let [rows] = await db.promise().query(query, [id]);
			if (rows.length === 0) {
				return res.status(400).json({ message: "Storage does not exist" });
			}
			query = `UPDATE storage SET deleted = 1 WHERE idStorage= ?`;
			await db.promise().query(query, [id]);
			res.status(200).send(rows[0]);
		} catch (e) {
			next(e);
		}
	};

	patchStorageById = async (req, res, next) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const {
			modelName,
			capacity,
			idManufacturer,
			idStorageType,
			RPM,
			image
		} = req.body;
		
		try {
			const { id } = req.params;

			let userQuery = `select idManufacturer from manufacturers where idManufacturer = ?;`
			let [rows] = await db.promise().query(userQuery, [idManufacturer]);
			if (rows.length === 0) {
				return res
					.status(400)
					.json({ message: "Given idManufacturer does not exist" });
			}

			userQuery = `select idStorageType from storagetypes where idStorageType = ?;`;
			[rows] = await db.promise().query(userQuery, [idStorageType]);
			if (rows.length === 0) {
				return res.status(400).json({ message: "Given idStorageType does not exist" });
			}
			console.log(req.body);

			const sql = `UPDATE storage SET modelName = ?, capacity = ?, idManufacturer = ?, idStorageType = ?, RPM = ?, image = ? WHERE idStorage = ?`;
			let data = [
				modelName,
				capacity,
				idManufacturer,
				idStorageType,
				parseInt(RPM),
				image,
				id,
			];

			// execute the UPDATE statement
			db.promise()
				.query(sql, data)
				.then(() => {
					res.status(201).send({
						message: "Storage updated",
						modelName,
						capacity,
						idManufacturer,
						idStorageType,
						RPM,
						image,
						id,
					});
				})
				.catch((e) => {
					console.log(e);
					next(e);
				});
		} catch (e) {
			next(
				e.name && e.name === "ValidationError" ? new ValidationError(e) : e
			);
		}
	};

	createStorage = async (req, res, next) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const {
			modelName,
			capacity,
			idManufacturer,
			idStorageType,
			RPM,
			image
		} = req.body;

		try {
			const manufacturer = await db
				.promise()
				.query(`select idManufacturer from manufacturers where idManufacturer = ?`, [idManufacturer])
			if (manufacturer[0].length === 0) {
				return res
					.status(400)
					.json({ message: "Given idManufacturer does not exist" });
			}

			const idStorage = uuidv4();
			const sqlInsert =
				"INSERT INTO storage (idStorage, modelName, capacity, idManufacturer, idStorageType, RPM, image) VALUES (?,?,?,?,?,?,?)";
			db.promise()
				.query(sqlInsert, [
					idStorage,
					modelName,
					capacity,
					idManufacturer,
					idStorageType,
					RPM,
					image
				])
				.then(() => {
					res.status(201).send({
						message: "Storage added",
						id: idStorage,
					});
				});
		} catch (e) {
			next(e.name && e.name === "ValidationError" ? new ValidationError(e) : e);
		}
	};
}

module.exports = StorageController;
