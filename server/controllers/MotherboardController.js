const db = require("../utils/db");
const { validationResult } = require("express-validator");
const { v4: uuidv4, validate: uuidValidate } = require("uuid");
const mysql = require('mysql2');
const SQL = require("@nearform/sql");

class MotherboardController {
	fetchMotherboards = async (req, res, next) => {
		try {
			const results = await db.promise().query(`SELECT motherboards.*, cpusockets.socketType, manufacturers.manufacturerName, formfactors.formfactor, ramtypes.ramType FROM motherboards
			LEFT JOIN manufacturers ON motherboards.idManufacturer = manufacturers.idManufacturer
			LEFT JOIN cpusockets ON motherboards.idCpuSocket = cpusockets.idCpuSocket
			LEFT JOIN formfactors ON motherboards.idFormfactor = formfactors.idFormfactor
			LEFT JOIN ramtypes ON motherboards.idRamType = ramtypes.idRamType
			WHERE motherboards.deleted = 0;`);
			res.status(200).send(results[0]);
		} catch (e) {
			next(e);
		}
	};

	fetchMotherboardsByBuild = async (req, res, next) => {
		try {
			const { id } = req.params;
			
			const query = `select idCpuSocket from cpus where idProcessor = ?`;
			let [rows] = await db.promise().query(query, [id]);
			if (rows.length === 0) {
				return res.status(400).json({ message: "Given cpu does not exist" });
			}

			const cpuSocket = rows[0].idCpuSocket;

			const userQuery = `SELECT motherboards.*, cpusockets.socketType, manufacturers.manufacturerName, formfactors.formfactor, formfactors.height, formfactors.width, ramtypes.ramType,
			motherboard_has_storagetypes.amount, storagetypes.idStorageType, storagetypes.storageType FROM motherboards
			LEFT JOIN manufacturers ON motherboards.idManufacturer = manufacturers.idManufacturer
			LEFT JOIN cpusockets ON motherboards.idCpuSocket = cpusockets.idCpuSocket
			LEFT JOIN formfactors ON motherboards.idFormfactor = formfactors.idFormfactor
			LEFT JOIN ramtypes ON motherboards.idRamType = ramtypes.idRamType
			LEFT JOIN motherboard_has_storagetypes ON motherboards.idMotherboard = motherboard_has_storagetypes.idMotherboard
			LEFT JOIN storagetypes ON motherboard_has_storagetypes.idStorageType = storagetypes.idStorageType
			WHERE motherboards.idCpuSocket = ?
			AND motherboards.deleted = 0
			ORDER BY idMotherboard;`;
			[rows] = await db.promise().query(userQuery, [cpuSocket]);
			const data = rows;

			// https://stackoverflow.com/questions/30025965/merge-duplicate-objects-in-array-of-objects?answertab=trending#tab-top


			const result = Array.from(new Set(data.map(s => s.idMotherboard)))
			.map(id => {
				const test = {
					...data.filter(s => s.idMotherboard === id).map(rest => rest)[0],
					storage: data.filter(s => s.idMotherboard === id).map(storage => {return {idStorageType: storage.idStorageType, type: storage.storageType, amount: storage.amount}}),
					// idStorage: data.filter(s => s.idMotherboard === id).map(storage => storage.idStorageType)
				}
				delete test.idStorageType;
				delete test.storageType;
				delete test.amount;
				return test;
			})

			res.status(200).send(result);
		} catch (e) {
			next(
				e.name && e.name === "ValidationError" ? new ValidationError(e) : e
			);
		}
	};

	fetchMotherboardsByFilter = async (req, res, next) => {
		try {
			let { query } = req.params;
			let encodedStr = query.replace(/\%/g,"Percent");
			encodedStr = query.replace(/[/^#\%]/g,"")
			encodedStr = encodedStr.replace(/[\u00A0-\u9999<>\&]/gim, i => '&#'+i.charCodeAt(0)+';')

			const userQuery = `SELECT motherboards.*, cpusockets.socketType, manufacturers.manufacturerName, formfactors.formfactor, ramtypes.ramType FROM motherboards
			LEFT JOIN manufacturers ON motherboards.idManufacturer = manufacturers.idManufacturer
			LEFT JOIN cpusockets ON motherboards.idCpuSocket = cpusockets.idCpuSocket
			LEFT JOIN formfactors ON motherboards.idFormfactor = formfactors.idFormfactor
			LEFT JOIN ramtypes ON motherboards.idRamType = ramtypes.idRamType
			WHERE CONCAT_WS('', modelName, manufacturerName, socketType, ramType, formfactor) LIKE ?
			AND motherboards.deleted = 0;`;
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

	fetchMotherboardById = async (req, res, next) => {
		try {
			const { id } = req.params;
			let userQuery = `SELECT 
			motherboards.*, cpusockets.socketType, manufacturers.manufacturerName, formfactors.formfactor, ramtypes.ramType,
			motherboard_has_storagetypes.idStorageType, motherboard_has_storagetypes.amount, storagetypes.storageType
			FROM motherboards
			LEFT JOIN manufacturers ON motherboards.idManufacturer = manufacturers.idManufacturer
			LEFT JOIN cpusockets ON motherboards.idCpuSocket = cpusockets.idCpuSocket
			LEFT JOIN formfactors ON motherboards.idFormfactor = formfactors.idFormfactor
			LEFT JOIN ramtypes ON motherboards.idRamType = ramtypes.idRamType
			LEFT JOIN motherboard_has_storagetypes ON motherboards.idMotherboard = motherboard_has_storagetypes.idMotherboard
			LEFT JOIN storagetypes ON motherboard_has_storagetypes.idStorageType = storagetypes.idStorageType
			WHERE motherboards.idMotherboard= ?;`;
			let [rows] = await db.promise().query(userQuery, [id]);
			if (rows.length === 0) {
				return res.status(400).json({ message: "Motherboard does not exist" });
			}

			const finalResult = {
				...rows[0],
				idStorageType: [],
				storageType: [],
				amount: []
			}

			rows.map(item => {
				finalResult.idStorageType.push(item.idStorageType)
				finalResult.storageType.push(item.storageType)
				finalResult.amount.push(item.amount)
			});

			res.status(200).send(finalResult);
		} catch (e) {
			next(e);
		}
	};

	createMotherboard = async (req, res, next) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const {
			idManufacturer,
			idCpuSocket,
			idFormfactor,
			idRamType,
			modelName,
			wifi,
			sataPorts,
			pcieSlots,
			memorySlots,
			image,
			storageMethods
		} = req.body;
		try {
			let userQuery = `select idManufacturer from manufacturers where idManufacturer = ?;`;
			let [rows] = await db.promise().query(userQuery, [idManufacturer]);
			if (rows.length === 0) {
				return res.status(400).json({ message: "Given idManufacturer does not exist" });
			}
			userQuery = `select idCpuSocket from cpusockets where idCpuSocket = ?;`;
			[rows] = await db.promise().query(userQuery, [idCpuSocket]);
			if (rows.length === 0) {
				return res.status(400).json({ message: "Given idCpuSocket does not exist" });
			}
			userQuery = `select idFormfactor from formfactors where idFormfactor = ?;`;
			[rows] = await db.promise().query(userQuery, [idFormfactor]);
			if (rows.length === 0) {
				return res.status(400).json({ message: "Given idFormfactor does not exist" });
			}
			userQuery = `select idRamType from ramtypes where idRamType = ?;`;
			[rows] = await db.promise().query(userQuery, [idRamType]);
			if (rows.length === 0) {
				return res.status(400).json({ message: "Given idRamType does not exist" });
			}

			const id = uuidv4();
			let sqlInsert =
				"INSERT INTO motherboards (idMotherboard, idManufacturer, idCpuSocket, idRamType, idFormfactor, modelName, wifi, sataPorts, pcieSlots, memorySlots, image) VALUES (?,?,?,?,?,?,?,?,?,?,?)";
			db.promise()
			.query(sqlInsert, [
				id,
				idManufacturer,
				idCpuSocket,
				idRamType,
				idFormfactor,
				modelName,
				wifi,
				sataPorts,
				pcieSlots,
				memorySlots,
				image,
			])
				
			const inserter = [];
			storageMethods.map((storage) => {
				// only add valid storageTypes
				if (uuidValidate(storage.idStorageType)) {
					inserter.push(
						`('${uuidv4()}', '${id}', '${storage.idStorageType}', ${storage.amount})`
					);
				}
			});
			if (inserter.length > 0) {
				const storageSqlInsert = `INSERT INTO motherboard_has_storagetypes (id, idMotherboard, idStorageType, amount) VALUES ${inserter.join(
					", "
				)}`;
				await db.promise().query(storageSqlInsert);
			}
			res.status(201).send({
				message: "Storage method",
				id: id,
			});
		} catch (e) {
			next(e.name && e.name === "ValidationError" ? new ValidationError(e) : e);
		}
	};

	patchMotherboardById = async (req, res, next) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const {
			idManufacturer,
			idCpuSocket,
			idFormfactor,
			idRamType,
			modelName,
			wifi,
			sataPorts,
			pcieSlots,
			memorySlots,
			storageMethods,
			image,
		} = req.body;

		try {
			const { id } = req.params;
			let userQuery = `select idManufacturer from manufacturers where idManufacturer = ?;`;
			let [rows] = await db.promise().query(userQuery, [idManufacturer]);
			if (rows.length === 0) {
				return res.status(400).json({ message: "Given idManufacturer does not exist" });
			}
			userQuery = `select idCpuSocket from cpusockets where idCpuSocket = ?;`;
			[rows] = await db.promise().query(userQuery, [idCpuSocket]);
			if (rows.length === 0) {
				return res.status(400).json({ message: "Given idCpuSocket does not exist" });
			}
			userQuery = `select idFormfactor from formfactors where idFormfactor = ?;`;
			[rows] = await db.promise().query(userQuery, [idFormfactor]);
			if (rows.length === 0) {
				return res.status(400).json({ message: "Given idFormfactor does not exist" });
			}
			userQuery = `select idRamType from ramtypes where idRamType = ?;`;
			[rows] = await db.promise().query(userQuery, [idRamType]);
			if (rows.length === 0) {
				return res.status(400).json({ message: "Given idRamType does not exist" });
			}
			const sql = `UPDATE motherboards SET idManufacturer = ?, idCpuSocket = ?, idFormfactor = ?, idRamType = ?, modelName = ?, wifi = ?, sataPorts = ?, pcieSlots = ?, memorySlots = ?, image = ? WHERE idMotherboard=?`;
			let data = [
				idManufacturer,
				idCpuSocket,
				idFormfactor,
				idRamType,
				modelName,
				wifi,
				sataPorts,
				pcieSlots,
				memorySlots,
				image,
				id,
			];
			await db.promise().query(sql, data);

			// TODO: REMOVE and fix redirect on update
			const query = `SELECT id, idStorageType, amount FROM motherboard_has_storagetypes WHERE idMotherboard = ? ;`;
			const results = await db
				.promise()
				.query(
					query, [id]
				);

			let AA = [], //add
				RA = [], //remove
				updateArray = []; //remove
			
			// Compare user input vs old input for new/ updates
			storageMethods.map((x) => {
				const tempIndex = results[0].findIndex(obj => obj.idStorageType === x.idStorageType);
				if(tempIndex >= 0) {
					// This was already in the list and should be updated or ignored
					if( storageMethods[tempIndex].amount !== results[0][tempIndex].amount ) {
						updateArray.push({...storageMethods[tempIndex], id: results[0][tempIndex].id})
					} else return;
				} else {
					// Otherwise this is new and should be added
					console.log('This is new')
					AA.push(x)
				}
			})

			// Compare old input vs user input for inputs that should be removed
			results[0].map((x, i) => {
				const tempIndex = storageMethods.findIndex(obj => obj.idStorageType === x.idStorageType);
				if(tempIndex === -1) {
					console.log('This should be removed');
					RA.push(results[0][i])
				}
			})

			const inserter = [],
				updater = [],
				remover = [];

			// Add completely new storage here
			AA.forEach((storage) => {
				if (uuidValidate(storage.idStorageType)) {
					inserter.push(`('${uuidv4()}', '${id}', '${storage.idStorageType}', ${storage.amount})`);
				}
			});
			if (inserter.length > 0) {
				const storageSqlInsert = `INSERT INTO motherboard_has_storagetypes (id, idMotherboard, idStorageType, amount) VALUES ${inserter.join(
					", "
				)}`;
				await db.promise().query(storageSqlInsert);
			}

			// Add completely new storage here
			updateArray.map((storage) => {
				if (uuidValidate(storage.idStorageType)) {
					updater.push(storage);
				}
			});

			if (updater.length > 0) {
				let storageSqlInsert = '';
				updater.map((val) => {
					storageSqlInsert += mysql.format(`UPDATE motherboard_has_storagetypes SET amount = ? WHERE id = ?; `, [val.amount, val.id]);
				})
				await db.promise().query(storageSqlInsert);
			}
			

			RA.forEach((storage) => {
				// only remove valid storage
				console.log(storage)
				if (uuidValidate(storage.idStorageType)) {
					remover.push(`'${storage.idStorageType}'`);
				}
			});
			if (remover.length > 0) {
				const storageSqlRemover = `DELETE FROM motherboard_has_storagetypes WHERE idMotherboard = ? AND idStorageType IN (${remover.join(
					", "
				)})`;
				await db.promise().query(storageSqlRemover, [id]);
			}
			
			res.status(201).send({
				message: "Motherboard updated",
				id: id
			});
		} catch (e) {
			next(e.name && e.name === "ValidationError" ? new ValidationError(e) : e);
		}
	};

	
	deleteMotherboardById = async (req, res, next) => {
		try {
			const { id } = req.params;

			let query = `SELECT * FROM motherboards WHERE motherboards.idMotherboard = ? LIMIT 1;`;
			let [rows] = await db.promise().query(query, [id]);
			if (rows.length === 0) {
				return res.status(400).json({ message: "Motherboard does not exist" });
			}
			query = `UPDATE motherboards SET deleted = 1 WHERE idMotherboard= ?`;
			await db.promise().query(query, [id]);
			res.status(200).send(rows[0]);
		} catch (e) {
			next(e);
		}
	};
}

module.exports = MotherboardController;
