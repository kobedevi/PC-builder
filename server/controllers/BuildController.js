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

	fetchFeaturedBuilds = async (req, res, next) => {
		try {
			const results = await db.promise().query(`
				SELECT idBuild, users.userName, cpus.modelName as cpu_modelName, cpus.image as cpu_image, gpu_has_partners.modelName as gpu_modelName, gpu_has_partners.image as gpu_image, cases.modelName as case_modelName, cases.image as case_image FROM builds
				LEFT JOIN users ON builds.idUser = users.idUsers
				LEFT JOIN cpus ON builds.idProcessor = cpus.idProcessor
				LEFT JOIN gpu_has_partners ON builds.idGpu = gpu_has_partners.idGpuPartner
				LEFT JOIN cases ON builds.idCase = cases.idCase
				ORDER BY date DESC LIMIT 3;
			`);
			res.status(200).send(results[0]);
		} catch (e) {
			next(e.name && e.name === "ValidationError" ? new ValidationError(e) : e);
		}
	};

	fetchBuildById = async (req, res, next) => {
		try {
			const { id } = req.params;
			let userQuery = `
				SELECT builds.*,
				users.idUsers as user_id, users.userName as user_userName, 
				cpus.idProcessor as cpu_id, cpus.idManufacturer as cpu_idManufacturer, cpus.modelName as cpu_modelName, cpus.clockSpeed as cpu_clockSpeed, cpus.cores as cpu_cores, cpus.wattage as cpu_wattage, t1.socketType as cpu_socketType, cpus.image as cpu_image,
				cpucoolers.idCpuCooler as cpucooler_id, cpucoolers.idManufacturer as cpucooler_idManufacturer, cpucoolers.modelName as cpucooler_modelName, cpucoolers.height as cpucooler_height, cpucoolers.width as cpucooler_width, cpucoolers.depth as cpucooler_depth, cpucoolers.image as cpucooler_image,
				motherboards.idMotherboard as motherboard_id, motherboards.idManufacturer as motherboard_idManufacturer, motherboards.modelName as motherboard_modelName, motherboards.wifi as motherboard_wifi, motherboards.memorySlots as motherboard_memorySlots, motherboards.sataPorts as motherboard_sataPorts, motherboards.pcieSlots as motherboard_pcieSlots, t2.socketType as motherboard_sockettype, formfactors.formfactor as motherboard_formfactor, formfactors.height as motherboard_height, formfactors.width as motherboard_width, motherboards.image as motherboard_image,
				ram.idRam as ram_id, ram.idManufacturer as ram_idManufacturer, ram.modelName as ram_modelName, ram.sizePerStick as ram_sizePerStick, ram.stickAmount as ram_stickAmount, ram.speed as ram_speed, ram.image as ram_image,
				gpu_has_partners.idGpuPartner as gpu_id, gpu_has_partners.idManufacturer as gpu_idManufacturer, gpu_has_partners.modelName as gpu_modelName, gpu_has_partners.clockspeed as gpu_clockSpeed, gpu_has_partners.watercooled as gpu_watercooled, gpu_has_partners.wattage as gpu_wattage, gpus.modelName as gpu_chipset, gpus.vram as gpu_vram, gpu_has_partners.image as gpu_image, gpu_has_partners.height as gpu_height, gpu_has_partners.width as gpu_width, gpu_has_partners.depth as gpu_depth, 
				cases.idCase as case_id, cases.idManufacturer as case_idManufacturer, cases.modelName as case_modelName, cases.height as case_height, cases.width as case_width, cases.depth as case_depth, cases.\`2-5_slots\` as case_smallSlots, cases.\`3-5_slots\` as case_bigSlots, cases.image as case_image,
				psu.idPsu as psu_id, psu.idManufacturer as psu_idManufacturer, psu.modelName as psu_modelName, psu.modular as psu_modular, psu.wattage as psu_wattage
				FROM builds
				LEFT JOIN users ON builds.idUser = users.idUsers
				LEFT JOIN cpus ON builds.idProcessor = cpus.idProcessor
				LEFT JOIN cpusockets AS t1 ON cpus.idCpuSocket = t1.idCpuSocket
				LEFT JOIN manufacturers ON cpus.idManufacturer = manufacturers.idManufacturer
				LEFT JOIN cpucoolers ON builds.idCpuCooler = cpucoolers.idCpuCooler
				LEFT JOIN motherboards ON builds.idMotherboard = motherboards.idMotherboard
				LEFT JOIN cpusockets AS t2 ON motherboards.idCpuSocket = t2.idCpuSocket
				LEFT JOIN formfactors ON motherboards.idFormfactor = formfactors.idFormfactor
				LEFT JOIN ram ON builds.idRam = ram.idRam
				LEFT JOIN gpu_has_partners ON builds.idGpu = gpu_has_partners.idGpuPartner
				LEFT JOIN gpus ON gpu_has_partners.idGpu = gpus.idGpu
				LEFT JOIN cases ON builds.idCase = cases.idCase
				LEFT JOIN psu ON builds.idPsu = psu.idPsu
				WHERE builds.idBuild = ? 
				ORDER BY date LIMIT 1;
			`;
			let [rows] = await db.promise().query(userQuery, [id]);
			if (rows.length === 0) {
				return res.status(400).json({ message: "Build does not exist" });
			}

			const finalResult = {}
			let tempManuArr = []
			let cpucoolerId;

			// push manufacturer to items
			Object.entries(rows[0]).map(([key, item]) => {
				const category = key.split('_');
				if(key.includes('idManufacturer')) {
					tempManuArr.push(`'${item}'`)
				}
				if(key === 'cpucooler_id') {
					cpucoolerId = item
				}
				if(!key.startsWith("id")){
					finalResult[category[0]] = {...finalResult[category[0]]}
					finalResult[category[0]][category[1]] = item
				}
			})

			tempManuArr = Array.from(new Set(tempManuArr));

			// Only doing this for manufacturers since this table would be joined many times over
			// Get all the relevant manufacturers
			userQuery = `
				SELECT * FROM manufacturers
				WHERE idManufacturer IN (${tempManuArr.join(
					", "
				)})
			;`;
			[rows] = await db.promise().query(userQuery);

			// Add to relevant objects
			Object.entries(finalResult).map(([key, item]) => {
				if(item?.idManufacturer){
					finalResult[key].manufacturerName = rows.find(x => x.idManufacturer === item.idManufacturer).manufacturerName;
				}
			})

			// 
			userQuery =`SELECT cpusockets.socketType FROM cpucoolers
			LEFT JOIN cpucooler_has_cpusockets ON cpucoolers.idCpuCooler = cpucooler_has_cpusockets.idCpuCooler
			LEFT JOIN cpusockets ON cpucooler_has_cpusockets.idCpuSocket = cpusockets.idCpuSocket
			WHERE cpucoolers.idCpuCooler = ?`;
			const results = await db.promise()
				.query(userQuery, [cpucoolerId]);
			if (results[0].length === 0) {
				return res.status(400).json({ message: "CPU cooler does not exist" });
			}

			const socketType= [];
			results[0].map(item => {
				socketType.push(item.socketType)
			});

			// Add all storageTypes to final motherboard
			finalResult.cpucooler.socketType = socketType;

			userQuery = `SELECT 
			motherboard_has_storagetypes.idStorageType, motherboard_has_storagetypes.amount, storagetypes.storageType
			FROM motherboards
			LEFT JOIN motherboard_has_storagetypes ON motherboards.idMotherboard = motherboard_has_storagetypes.idMotherboard
			LEFT JOIN storagetypes ON motherboard_has_storagetypes.idStorageType = storagetypes.idStorageType
			WHERE motherboards.idMotherboard= ?;`;
			[rows] = await db.promise().query(userQuery, [finalResult.motherboard.id]);
			if (rows.length === 0) {
				return res.status(400).json({ message: "Motherboard does not exist" });
			}
			finalResult.motherboard.storage = [];
			rows.map(item => {
				finalResult.motherboard.storage= [
					...finalResult.motherboard.storage,
					{
						type:item.storageType,
						amount:item.amount
					}
				]
			});


			res.status(200).send(finalResult);
		} catch (e) {
			next(e.name && e.name === "ValidationError" ? new ValidationError(e) : e);
		}
	};

	// fetchStorageById = async (req, res, next) => {
	// 	try {
	// 		const { id } = req.params;
	// 		const results = await db.promise()
	// 			.query(`SELECT storage.*, manufacturers.manufacturerName, storageTypes.storageType FROM storage
	// 			LEFT JOIN manufacturers ON storage.idManufacturer = manufacturers.idManufacturer
	// 			LEFT JOIN storagetypes ON storage.idStorageType = storagetypes.idStorageType
	// 			WHERE storage.idStorage = ? AND storage.deleted = 0 LIMIT 1;`, [id]);
	// 		if (results[0].length === 0) {
	// 			return res.status(400).json({ message: "Storage does not exist" });
	// 		}
	// 		res.status(200).send(results[0]);
	// 	} catch (e) {
	// 		next(e);
	// 	}
	// };

	// fetchStorageByBuild = async (req, res, next) => {
	// 	try {
	// 		const {motherboardId} = req.params;
	// 		let userQuery, rows;
	// 		if(motherboardId !== 'undefined') {
	// 			userQuery = `SELECT storagetypes.idStorageType FROM motherboards
	// 			LEFT JOIN motherboard_has_storagetypes ON motherboards.idMotherboard = motherboard_has_storagetypes.idMotherboard
	// 			LEFT JOIN storagetypes ON motherboard_has_storagetypes.idStorageType = storagetypes.idStorageType
	// 			WHERE motherboards.idMotherboard = ?
	// 			AND motherboards.deleted = 0`;
	// 			[rows] = await db.promise().query(userQuery, [motherboardId]);
	// 			if (rows.length === 0) {
	// 				return res.status(400).json({ message: "Given motherboard does not exist" });
	// 			}
	// 		}
	// 		// https://stackoverflow.com/questions/33957252/node-js-mysql-query-where-id-array
	// 		const arr = (motherboardId !== 'undefined') ? Array.from(rows.map(val => { return val?.idStorageType; })) : [] ;
	// 		userQuery = `SELECT *, manufacturers.manufacturerName, storageTypes.storageType FROM storage
	// 		LEFT JOIN manufacturers ON storage.idManufacturer = manufacturers.idManufacturer
	// 		LEFT JOIN storagetypes ON storage.idStorageType = storagetypes.idStorageType
	// 		WHERE ${arr.length > 0 ? `storage.idStorageType IN (${mysql.escape(arr)}) AND` : ''}
	// 		storage.deleted = 0`;
	// 		[rows] = await db.promise().query(userQuery);
	// 		res.status(200).send(rows);
	// 	} catch (e) {
	// 		next(
	// 			e.name && e.name === "ValidationError" ? new ValidationError(e) : e
	// 		);
	// 	}
	// };

	// deleteStorageById = async (req, res, next) => {
	// 	try {
	// 		const { id } = req.params;
	// 		let query = `SELECT * FROM storage WHERE storage.idStorage= ? LIMIT 1;`;
	// 		let [rows] = await db.promise().query(query, [id]);
	// 		if (rows.length === 0) {
	// 			return res.status(400).json({ message: "Storage does not exist" });
	// 		}
	// 		query = `UPDATE storage SET deleted = 1 WHERE idStorage= ?`;
	// 		await db.promise().query(query, [id]);
	// 		res.status(200).send(rows[0]);
	// 	} catch (e) {
	// 		next(e);
	// 	}
	// };

	// patchStorageById = async (req, res, next) => {
	// 	const errors = validationResult(req);
	// 	if (!errors.isEmpty()) {
	// 		return res.status(400).json({ errors: errors.array() });
	// 	}

	// 	const {
	// 		modelName,
	// 		capacity,
	// 		idManufacturer,
	// 		idStorageType,
	// 		RPM,
	// 		image
	// 	} = req.body;
		
	// 	try {
	// 		const { id } = req.params;

	// 		let userQuery = `select idManufacturer from manufacturers where idManufacturer = ?;`
	// 		let [rows] = await db.promise().query(userQuery, [idManufacturer]);
	// 		if (rows.length === 0) {
	// 			return res
	// 				.status(400)
	// 				.json({ message: "Given idManufacturer does not exist" });
	// 		}

	// 		userQuery = `select idStorageType from storagetypes where idStorageType = ?;`;
	// 		[rows] = await db.promise().query(userQuery, [idStorageType]);
	// 		if (rows.length === 0) {
	// 			return res.status(400).json({ message: "Given idStorageType does not exist" });
	// 		}

	// 		const sql = `UPDATE storage SET modelName = ?, capacity = ?, idManufacturer = ?, idStorageType = ?, RPM = ?, image = ? WHERE idStorage = ?`;
	// 		let data = [
	// 			modelName,
	// 			capacity,
	// 			idManufacturer,
	// 			idStorageType,
	// 			parseInt(RPM),
	// 			image,
	// 			id,
	// 		];

	// 		// execute the UPDATE statement
	// 		db.promise()
	// 			.query(sql, data)
	// 			.then(() => {
	// 				res.status(201).send({
	// 					message: "Storage updated",
	// 					modelName,
	// 					capacity,
	// 					idManufacturer,
	// 					idStorageType,
	// 					RPM,
	// 					image,
	// 					id,
	// 				});
	// 			})
	// 			.catch((e) => {
	// 				next(e);
	// 			});
	// 	} catch (e) {
	// 		next(
	// 			e.name && e.name === "ValidationError" ? new ValidationError(e) : e
	// 		);
	// 	}
	// };

	createBuild = async (req, res, next) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		let user = null;
		if(req?.user) {
			user = req.user
		}

		const {
			idProcessor,
			idCpuCooler,
			idMotherboard,
			idRam,
			idGpu = null,
			idCase,
            idPsu,
            storage,
		} = req.body;



		try {
			const unixDate = Math.floor(Date.now() / 1000);
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
			if(idGpu) {
				[rows] = await db.promise().query(`select idGpuPartner from gpu_has_partners where idGpuPartner = ?`, [idGpu]);
				if (rows.length === 0) {
					return res.status(400).json({ message: "Given GPU does not exist" });
				}
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
				`INSERT INTO builds (date, idBuild, idUser, idProcessor, idCpuCooler, idMotherboard, idRam, idGpu, idCase, idPsu) VALUES (?,?,?,?,?,?,?,?,?,?)`;
			db.promise()
				.query(sqlInsert, [
					unixDate,
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
			next(e.name && e.name === "ValidationError" ? new ValidationError(e) : e);
		}
	};
}

module.exports = BuildController;
