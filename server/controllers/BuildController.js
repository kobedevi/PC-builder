const db = require("../utils/db");
const { validationResult } = require("express-validator");
const { v4: uuidv4 } = require("uuid");
const ValidationError = require("../errors/ValidationError");
const NotFoundError = require("../errors/NotFoundError");
const ForbiddenError = require("../errors/ForbiddenError");

class BuildController {
	fetchBuildInfo = async (req, res, next) => {
		try {
			const { id } = req.params;
			const {user} = req;
			const [rows] = await db.promise().query(`SELECT idUser FROM builds WHERE idBuild = ? LIMIT 1;`, [id]);
			if(rows.length > 0 && user.idUsers === rows[0].idUser) {
				return res.status(200).send(rows);
			} if(rows.length === 0){
				return next(new NotFoundError());
			} else {
				return next(new ForbiddenError());
			}
		} catch (e) {
			next(e);
		}
	};

	fetchBuilds = async (req, res, next) => {
		try {
			const results = await db.promise().query(`SELECT *, manufacturers.manufacturerName, storageTypes.storageType FROM storage
			LEFT JOIN manufacturers ON storage.idManufacturer = manufacturers.idManufacturer
			LEFT JOIN storagetypes ON storage.idStorageType = storagetypes.idStorageType
			WHERE storage.deleted = 0`);
			return res.status(200).send(results[0]);
		} catch (e) {
			next(e);
		}
	};

	fetchBuildsByUser = async (req, res, next) => {
		try {
			const { id, page=Math.abs(page) || 0, perPage=20 } = req.params;

			const [rows] = await db.promise().query(`SELECT idUsers FROM users WHERE idUsers = ?`, [id]);
            if (rows.length === 0) {
                return res.status(400).json({ message: "User does not exist" });
            }

			let pageAmount = await db.promise().query("SELECT COUNT(idBuild) as totalProducts FROM builds WHERE idUser = ?", [id])
			.then(res => Math.ceil(res[0][0].totalProducts / perPage));

			const results = await db.promise().query(`
				SELECT idBuild, builds.name, totalPrice, users.userName, cpus.modelName as cpu_modelName, cpus.image as cpu_image, gpu_has_partners.modelName as gpu_modelName, gpu_has_partners.image as gpu_image, cases.modelName as case_modelName, cases.image as case_image FROM builds
				LEFT JOIN users ON builds.idUser = users.idUsers
				LEFT JOIN cpus ON builds.idProcessor = cpus.idProcessor
				LEFT JOIN gpu_has_partners ON builds.idGpu = gpu_has_partners.idGpuPartner
				LEFT JOIN cases ON builds.idCase = cases.idCase
				WHERE builds.idUser = ?
				ORDER BY date DESC
				LIMIT ? OFFSET ?;
			`, [id, parseInt(perPage), parseInt(page*perPage)]);

			return res.status(200).send({results: results[0], pageAmount});
		} catch (e) {
			next(e.name && e.name === "ValidationError" ? new ValidationError(e) : e);
		}
	};

	fetchBuildsOverview = async (req, res, next) => {
		try {
			
			const { page=Math.abs(page) || 0, perPage=20 } = req.params;
			let pageAmount = await db.promise().query("SELECT COUNT(idBuild) as totalProducts FROM builds")
			.then(res => Math.ceil(res[0][0].totalProducts / perPage));

			const results = await db.promise().query(`
				SELECT idBuild, builds.name, totalPrice, builds.idUser, users.userName, cpus.modelName as cpu_modelName, cpus.image as cpu_image, gpu_has_partners.modelName as gpu_modelName, gpu_has_partners.image as gpu_image, cases.modelName as case_modelName, cases.image as case_image FROM builds
				LEFT JOIN users ON builds.idUser = users.idUsers
				LEFT JOIN cpus ON builds.idProcessor = cpus.idProcessor
				LEFT JOIN gpu_has_partners ON builds.idGpu = gpu_has_partners.idGpuPartner
				LEFT JOIN cases ON builds.idCase = cases.idCase
				ORDER BY date DESC
				LIMIT ? OFFSET ?;
			`, [parseInt(perPage), parseInt(page*perPage)]);
			return res.status(200).send({results: results[0], pageAmount});
		} catch (e) {
			next(e.name && e.name === "ValidationError" ? new ValidationError(e) : e);
		}
	};

	fetchFeaturedBuilds = async (req, res, next) => {
		try {
			const results = await db.promise().query(`
				SELECT idBuild, builds.name, totalPrice, users.idUsers as idUser, users.userName, cpus.modelName as cpu_modelName, cpus.image as cpu_image, gpu_has_partners.modelName as gpu_modelName, gpu_has_partners.image as gpu_image, cases.modelName as case_modelName, cases.image as case_image FROM builds
				LEFT JOIN users ON builds.idUser = users.idUsers
				LEFT JOIN cpus ON builds.idProcessor = cpus.idProcessor
				LEFT JOIN gpu_has_partners ON builds.idGpu = gpu_has_partners.idGpuPartner
				LEFT JOIN cases ON builds.idCase = cases.idCase
				ORDER BY date DESC LIMIT 3;
			`);
			return res.status(200).send(results[0]);
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
				cpus.idProcessor as cpu_id, cpus.price as cpu_price, cpus.idManufacturer as cpu_idManufacturer, cpus.modelName as cpu_modelName, cpus.clockSpeed as cpu_clockSpeed, cpus.cores as cpu_cores, cpus.wattage as cpu_wattage, t1.socketType as cpu_socketType, cpus.image as cpu_image,
				cpucoolers.idCpuCooler as cpucooler_id, cpucoolers.price as cpucooler_price, cpucoolers.idManufacturer as cpucooler_idManufacturer, cpucoolers.modelName as cpucooler_modelName, cpucoolers.height as cpucooler_height, cpucoolers.width as cpucooler_width, cpucoolers.depth as cpucooler_depth, cpucoolers.image as cpucooler_image,
				motherboards.idMotherboard as motherboard_id, motherboards.price as motherboard_price, motherboards.idManufacturer as motherboard_idManufacturer, motherboards.modelName as motherboard_modelName, motherboards.wifi as motherboard_wifi, motherboards.memorySlots as motherboard_memorySlots, motherboards.sataPorts as motherboard_sataPorts, motherboards.pcieSlots as motherboard_pcieSlots, t2.socketType as motherboard_sockettype, formfactors.idFormfactor as motherboard_idFormfactor, formfactors.formfactor as motherboard_formfactor, formfactors.height as motherboard_height, formfactors.width as motherboard_width, motherboards.image as motherboard_image, motherboards.idRamType as motherboard_idRamType,
				ram.idRam as ram_id, ram.price as ram_price, ram.idManufacturer as ram_idManufacturer, ram.modelName as ram_modelName, ram.sizePerStick as ram_sizePerStick, ram.stickAmount as ram_stickAmount, ram.speed as ram_speed, ram.image as ram_image,
				gpu_has_partners.idGpuPartner as gpu_id, gpu_has_partners.price as gpu_price, gpu_has_partners.idManufacturer as gpu_idManufacturer, gpu_has_partners.modelName as gpu_modelName, gpu_has_partners.clockspeed as gpu_clockSpeed, gpu_has_partners.watercooled as gpu_watercooled, gpu_has_partners.wattage as gpu_wattage, gpus.modelName as gpu_chipset, gpus.vram as gpu_vram, gpu_has_partners.image as gpu_image, gpu_has_partners.height as gpu_height, gpu_has_partners.width as gpu_width, gpu_has_partners.depth as gpu_depth, 
				cases.idCase as case_id, cases.price as case_price, cases.idManufacturer as case_idManufacturer, cases.modelName as case_modelName, cases.height as case_height, cases.width as case_width, cases.depth as case_depth, cases.\`2-5_slots\` as case_smallSlots, cases.\`3-5_slots\` as case_bigSlots, cases.image as case_image,
				psu.idPsu as psu_id, psu.price as psu_price, psu.height as psu_height, psu.width as psu_width, psu.depth as psu_depth, psu.idManufacturer as psu_idManufacturer, psu.modelName as psu_modelName, psu.modular as psu_modular, psu.wattage as psu_wattage, psu.image as psu_image
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

			const finalResult = {};
			let tempManuArr = [];
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
			// Add buildName back
			finalResult.name = rows[0].name

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
			motherboard_has_storagetypes.idStorageType, motherboard_has_storagetypes.amount, storagetypes.storageType, storagetypes.idStorageType
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

			userQuery = `SELECT build_has_storage.idBuild, build_has_storage.idStorage, build_has_storage.amount, storage.modelName, storage.capacity, storage.rpm, storage.price, storage.image, storagetypes.storageType, storagetypes.idStorageType, manufacturers.manufacturerName FROM build_has_storage
			LEFT JOIN storage ON build_has_storage.idStorage = storage.idStorage
			LEFT JOIN storagetypes ON storage.idStorageType = storagetypes.idStorageType
			LEFT JOIN manufacturers ON storage.idManufacturer = manufacturers.idManufacturer
			WHERE idBuild = ?;`;
			[rows] = await db.promise().query(userQuery, [id]);
			finalResult[`storage`] = [];
			rows.map(item => {
				finalResult[`storage`] = [
					...finalResult[`storage`],
					{
						...item
					}
				]
			})

			return res.status(200).send(finalResult);
		} catch (e) {
			next(e.name && e.name === "ValidationError" ? new ValidationError(e) : e);
		}
	};

	updateBuild = async (req, res, next) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { user } = req
		const { id:idBuild } = req.params

		const {
			idProcessor,
			idCpuCooler,
			idMotherboard,
			idRam,
			idGpu = null,
			idCase,
            idPsu,
            storage = [],
			totalPrice
		} = req.body;
		
		try {
			let [rows] = await db.promise().query(`SELECT idUser FROM builds WHERE idBuild = ? LIMIT 1;`, [idBuild]);
			if(rows.length === 0){
				return next(new NotFoundError());
			}
			else if(rows[0].idUser !== user.idUsers) {
				return next(new ForbiddenError());
			}

            [rows] = await db.promise().query(`select idProcessor from cpus where idProcessor = ?`, [idProcessor]);
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
			
			const sqlInsert =
				`UPDATE builds SET idProcessor = ?, idCpuCooler = ?, idMotherboard = ?, idRam = ?, idGpu = ?, idCase = ?, idPsu = ?, totalPrice = ? WHERE idBuild = ?`;
			db.promise()
				.query(sqlInsert, [
					idProcessor,
                    idCpuCooler,
                    idMotherboard,
                    idRam,
                    idGpu,
                    idCase,
                    idPsu,
					totalPrice,
					idBuild
				])
				.then(async() => {
					// add storage
					if(storage.length > 0) {
						// Check if id's exist
						const storageIds = new Set();
						const inserter = [];
						storage.map((data) => {
							storageIds.add(data.idStorage);
							inserter.push([uuidv4(), idBuild, data.idStorage, data.amount]);
						})
						const temp = Array.from(storageIds);
						let userQuery = `
						SELECT COUNT(DISTINCT idStorage) = ? as isTrue 
						FROM storage
						WHERE FIND_IN_SET(idStorage, ?);
						`;
						[rows] = await db.promise().query(userQuery, [temp.length, temp.join(',')]);
						if(!rows[0].isTrue === 1) {
							return res.status(400).json({ message: "Given Storage does not exist" });
						}
						[rows] = await db.promise().query(`DELETE FROM build_has_storage WHERE idBuild = ?;`,[idBuild]);
						userQuery = `INSERT INTO build_has_storage (id, idBuild, idStorage, amount) VALUES ?`;				
						[rows] = await db.promise().query(userQuery, [inserter]);
					}
				})
				.then(() => {
					return res.status(201).send({
						message: "Build updated",
						id: idBuild,
					});
				}).catch((e) => next(e));
		} catch (e) {
			next(e.name && e.name === "ValidationError" ? new ValidationError(e) : e);
		}
	};

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
			name,
			idProcessor,
			idCpuCooler,
			idMotherboard,
			idRam,
			idGpu = null,
			idCase,
            idPsu,
            storage = [],
			totalPrice,
		} = req.body;
		
		try {
			const idBuild = uuidv4();
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
			

			const sqlInsert =
				`INSERT INTO builds (date, idBuild, name, idUser, idProcessor, idCpuCooler, idMotherboard, idRam, idGpu, idCase, idPsu, totalPrice) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)`;
			db.promise()
				.query(sqlInsert, [
					unixDate,
					idBuild,
					name,
                    user?.idUsers,
					idProcessor,
                    idCpuCooler,
                    idMotherboard,
                    idRam,
                    idGpu,
                    idCase,
                    idPsu,
					totalPrice
				])
				.then(async() => {
					// add storage
					if(storage.length > 0) {
						// Check if id's exist
						const storageIds = new Set();
						const inserter = [];
						storage.map((data) => {
							storageIds.add(data.idStorage);
							inserter.push([uuidv4(), idBuild, data.idStorage, data.amount]);
						})
						const temp = Array.from(storageIds);
						let userQuery = `
						SELECT COUNT(DISTINCT idStorage) = ? as isTrue 
						FROM storage
						WHERE FIND_IN_SET(idStorage, ?);
						`;
						[rows] = await db.promise().query(userQuery, [temp.length, temp.join(',')]);
						if(!rows[0].isTrue === 1) {
							return res.status(400).json({ message: "Given Storage does not exist" });
						}
						userQuery = `INSERT INTO build_has_storage (id, idBuild, idStorage, amount) VALUES ?`;				
						[rows] = await db.promise().query(userQuery, [inserter]);
					}
				})
				.then(() => {
					return res.status(201).send({
						message: "Build added",
						id: idBuild,
					});
				}).catch(e => next(e));
		} catch (e) {
			next(e.name && e.name === "ValidationError" ? new ValidationError(e) : e);
		}
	};
}

module.exports = BuildController;
