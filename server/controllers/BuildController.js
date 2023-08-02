const db = require("../utils/db");
const { validationResult } = require("express-validator");
const ValidationError = require("../errors/ValidationError");
const { v4: uuidv4 } = require("uuid");
const mysql = require('mysql2');

class BuildController {
	fetchBuilds = async (req, res, next) => {
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
			next(e);
		}
	};

	fetchStorageByBuild = async (req, res, next) => {
		try {
			const {motherboardId} = req.params;
			let userQuery, rows;
			if(motherboardId !== 'undefined') {
				userQuery = `SELECT storagetypes.idStorageType FROM motherboards
				LEFT JOIN motherboard_has_storagetypes ON motherboards.idMotherboard = motherboard_has_storagetypes.idMotherboard
				LEFT JOIN storagetypes ON motherboard_has_storagetypes.idStorageType = storagetypes.idStorageType
				WHERE motherboards.idMotherboard = ?
				AND motherboards.deleted = 0`;
				[rows] = await db.promise().query(userQuery, [motherboardId]);
				if (rows.length === 0) {
					return res.status(400).json({ message: "Given motherboard does not exist" });
				}
			}
			// https://stackoverflow.com/questions/33957252/node-js-mysql-query-where-id-array
			const arr = (motherboardId !== 'undefined') ? Array.from(rows.map(val => { return val?.idStorageType; })) : [] ;
			userQuery = `SELECT *, manufacturers.manufacturerName, storageTypes.storageType FROM storage
			LEFT JOIN manufacturers ON storage.idManufacturer = manufacturers.idManufacturer
			LEFT JOIN storagetypes ON storage.idStorageType = storagetypes.idStorageType
			WHERE ${arr.length > 0 ? `storage.idStorageType IN (${mysql.escape(arr)}) AND` : ''}
			storage.deleted = 0`;
			[rows] = await db.promise().query(userQuery);
			res.status(200).send(rows);
		} catch (e) {
			next(
				e.name && e.name === "ValidationError" ? new ValidationError(e) : e
			);
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
					next(e);
				});
		} catch (e) {
			next(
				e.name && e.name === "ValidationError" ? new ValidationError(e) : e
			);
		}
	};

	createBuild = async (req, res, next) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		console.log(req.user);
		let user = null;
		if(req?.user) {
			user = req.user
		}

		const {
			idProcessor,
			idCpuCooler,
			idMotherboard,
			idRam,
			idGpu,
			idCase,
            idPsu,
            storage,
		} = req.body;

		try {
            let [rows] = await db.promise().query(`select idProcessor from cpus where idProcessor = ?`, [idProcessor]);
            if (rows.length === 0) {
                return res.status(400).json({ message: "Given CPU does not exist" });
            }
            [rows] = await db.promise().query(`select idCpuCooler from cpucoolers where idCpuCooler = ?`, [idCpuCooler]);
            if (rows.length === 0) {
                return res.status(400).json({ message: "Given CPU cooler does not exist" });
            }
            [rows] = await db.promise().query(`select idMotherboard from motherboards where idMotherboard = ?`, [idMotherboard]);
            if (rows.length === 0) {
                return res.status(400).json({ message: "Given motherboard does not exist" });
            }
            [rows] = await db.promise().query(`select idRam from ram where idRam = ?`, [idRam]);
            if (rows.length === 0) {
                return res.status(400).json({ message: "Given memory does not exist" });
            }
            [rows] = await db.promise().query(`select idGpu from gpus where idGpu = ?`, [idGpu]);
            if (rows.length === 0) {
                return res.status(400).json({ message: "Given GPU does not exist" });
            }
            [rows] = await db.promise().query(`select idCase from cases where idCase = ?`, [idCase]);
            if (rows.length === 0) {
                return res.status(400).json({ message: "Given case does not exist" });
            }
            [rows] = await db.promise().query(`select idPsu from psu where idPsu = ?`, [idPsu]);
            if (rows.length === 0) {
                return res.status(400).json({ message: "Given PSU does not exist" });
            }

			const idBuild = uuidv4();
			const sqlInsert =
				`INSERT INTO builds (idBuild, idUser, idProcessor, idCpuCooler, idMotherboard, idRam, idGpu, idCase, idPsu) VALUES (?,?,?,?,?,?,?,?,?)`;
			db.promise()
				.query(sqlInsert, [
					idBuild,
                    user?.idUsers,
					idProcessor,
                    idCpuCooler,
                    idMotherboard,
                    idRam,
                    idGpu,
                    idCase,
                    idPsu,
				])
				.then(() => {
					res.status(201).send({
						message: "Build added",
						id: idBuild,
					});
				});
		} catch (e) {
            console.log(e);
			next(e.name && e.name === "ValidationError" ? new ValidationError(e) : e);
		}
	};
}

module.exports = BuildController;
