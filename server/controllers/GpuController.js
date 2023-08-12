const db = require("../utils/db");
const { validationResult } = require("express-validator");
const { v4: uuidv4 } = require("uuid");

class GpuController {
	fetchGpus = async (req, res, next) => {
		try {
			const {page=Math.abs(page) || 0, perPage=20} = req.params;

			let pageAmount = await db.promise().query("SELECT COUNT(idGpu) as totalProducts FROM gpus WHERE deleted = 0 ")
			.then(res => Math.ceil(res[0][0].totalProducts / perPage))

			const results = await db.promise().query(`SELECT * FROM gpus
			LEFT JOIN manufacturers ON gpus.idManufacturer = manufacturers.idManufacturer
			WHERE deleted = 0
			LIMIT ? OFFSET ?;`, [parseInt(perPage), parseInt(page*perPage)]);
			return res.status(200).send({results: results[0], pageAmount});
		} catch (e) {
			next(e);
		}
	};

	fetchOriginalGpusByFilter = async (req, res, next) => {
		try {
			let { query } = req.params;
			let encodedStr = query.replace(/\%/g,"Percent");
			encodedStr = query.replace(/[/^#\%]/g,"")
			encodedStr = encodedStr.replace(/[\u00A0-\u9999<>\&]/gim, i => '&#'+i.charCodeAt(0)+';')

			const userQuery = `SELECT * FROM gpus
			LEFT JOIN manufacturers ON gpus.idManufacturer = manufacturers.idManufacturer
			WHERE CONCAT_WS('', modelName, manufacturerName, vram, displayport, hdmi, vga, dvi) LIKE ?
			AND deleted = 0;`;
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

	fetchGpusByBuildFilter = async (req, res, next) => {
		try {
			const {query} = req.params;
			let encodedStr = query.replace(/\%/g,"Percent");
			encodedStr = query.replace(/[/^#\%]/g,"")
			encodedStr = encodedStr.replace(/[\u00A0-\u9999<>\&]/gim, i => '&#'+i.charCodeAt(0)+';')			

			const userQuery = `SELECT gpu_has_partners.*, manufacturers.manufacturerName, gpus.modelName AS chipset, gpus.vram FROM gpu_has_partners
			LEFT JOIN manufacturers ON gpu_has_partners.idManufacturer = manufacturers.idManufacturer
			LEFT JOIN gpus ON gpu_has_partners.idGpu = gpus.idGpu
			WHERE gpu_has_partners.deleted = 0
			AND CONCAT_WS('', gpu_has_partners.modelName, gpus.modelName, manufacturerName, clockspeed, vram) LIKE ?
			AND gpus.deleted = 0;`;
			const [rows] = await db.promise().query(userQuery, [`%${encodedStr}%`]);
			return res.status(200).send(rows);
		} catch (e) {
			next(
				e.name && e.name === "ValidationError" ? new ValidationError(e) : e
			);
		}
	};

	fetchGpusByBuild = async (req, res, next) => {
		try {
			const {page=Math.abs(page) || 0, perPage=20} = req.params;

			let pageAmount = await db.promise().query("SELECT COUNT(idGpuPartner) as totalProducts FROM gpu_has_partners WHERE deleted = 0")
			.then(res => Math.ceil(res[0][0].totalProducts / perPage))

			const userQuery = `SELECT gpu_has_partners.*, manufacturers.manufacturerName, gpus.modelName AS chipset, gpus.vram FROM gpu_has_partners
			LEFT JOIN manufacturers ON gpu_has_partners.idManufacturer = manufacturers.idManufacturer
			LEFT JOIN gpus ON gpu_has_partners.idGpu = gpus.idGpu
			WHERE gpu_has_partners.deleted = 0
			AND gpus.deleted = 0
			LIMIT ? OFFSET ?;`;
			const [rows] = await db.promise().query(userQuery, [parseInt(perPage), parseInt(page*perPage)]);
			return res.status(200).send({results: rows, pageAmount});
		} catch (e) {
			next(
				e.name && e.name === "ValidationError" ? new ValidationError(e) : e
			);
		}
	};

	fetchPartnerGpusByFilter = async (req, res, next) => {
		try {
			let { query } = req.params;
			let encodedStr = query.replace(/\%/g,"Percent");
			encodedStr = query.replace(/[/^#\%]/g,"")
			encodedStr = encodedStr.replace(/[\u00A0-\u9999<>\&]/gim, i => '&#'+i.charCodeAt(0)+';')

			const userQuery = `SELECT gpu_has_partners.*, manufacturers.manufacturerName, gpus.modelName AS ogCard, gpus.vram FROM gpu_has_partners
			LEFT JOIN manufacturers ON gpu_has_partners.idManufacturer = manufacturers.idManufacturer
			LEFT JOIN gpus ON gpu_has_partners.idGpu = gpus.idGpu
			WHERE CONCAT_WS('', gpu_has_partners.modelName, gpus.modelName, manufacturerName, clockspeed, vram) LIKE ?
			AND gpu_has_partners.deleted = 0
			AND gpus.deleted = 0;`
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
	
	fetchGpuPartners = async (req, res, next) => {
		try {
			const {page=Math.abs(page) || 0, perPage=20} = req.params;

			let pageAmount = await db.promise().query("SELECT COUNT(idGpuPartner) as totalProducts FROM gpu_has_partners WHERE deleted = 0 ")
			.then(res => Math.ceil(res[0][0].totalProducts / perPage))

			const results = await db
				.promise()
				.query(`SELECT gpu_has_partners.*, manufacturers.manufacturerName, gpus.modelName AS ogCard, gpus.vram FROM gpu_has_partners
				LEFT JOIN manufacturers ON gpu_has_partners.idManufacturer = manufacturers.idManufacturer
				LEFT JOIN gpus ON gpu_has_partners.idGpu = gpus.idGpu
				WHERE gpu_has_partners.deleted = 0
				AND gpus.deleted = 0
				LIMIT ? OFFSET ?;`, [parseInt(perPage), parseInt(page*perPage)]);
			return res.status(200).send({results: results[0], pageAmount});
		} catch (e) {
			next(e);
		}
	};

	createGpu = async (req, res, next) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { idManufacturer, modelName, vram, displayport, hdmi, vga, dvi } =
			req.body;

		try {
			const manufacturer = await db
				.promise()
				.query(`select idManufacturer from manufacturers where idManufacturer = ?`, [idManufacturer]);
			if (manufacturer[0].length === 0) {
				return res
					.status(400)
					.json({ message: "Given idManufacturer does not exist" });
			}
			const id = uuidv4();
			const sqlInsert =
				"INSERT INTO gpus (idGpu, idManufacturer, modelName, vram, displayport, hdmi, vga, dvi) VALUES (?,?,?,?,?,?,?,?)";
			db.promise()
				.query(sqlInsert, [
					id,
					idManufacturer,
					modelName,
					vram,
					displayport,
					hdmi,
					vga,
					dvi,
				])
				.then(() => {
					return res.status(201).send({
						message: "Gpu added",
						id,
					});
				});
		} catch (e) {
			next(e.name && e.name === "ValidationError" ? new ValidationError(e) : e);
		}
	};

	createGpuPartner = async (req, res, next) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const {
			idGpu,
			idManufacturer,
			modelName,
			clockspeed,
			watercooled,
			height,
			width,
			depth,
			image,
			tdp,
			price
		} = req.body;

		try {
			const manufacturer = await db
				.promise()
				.query(`select idManufacturer from manufacturers where idManufacturer = ?`, [idManufacturer]);
			if (manufacturer[0].length === 0) {
				return res
					.status(400)
					.json({ message: "Given idManufacturer does not exist" });
			}

			const gpu = await db
				.promise()
				.query(`select idGpu from gpus where idGpu = "${idGpu}"`);
			if (gpu[0].length === 0) {
				return res.status(400).json({ message: "Given idGpu does not exist" });
			}

			const id = uuidv4();
			const sqlInsert =
				"INSERT INTO gpu_has_partners (idGpuPartner, idGpu, idManufacturer, modelName, clockspeed, watercooled, height, width, depth, wattage, price, image) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)";
			db.promise()
				.query(sqlInsert, [
					id,
					idGpu,
					idManufacturer,
					modelName,
					clockspeed,
					watercooled,
					height,
					width,
					depth,
					tdp,
					price,
					image,
				])
				.then(() => {
					return res.status(201).send({
						message: "Gpu Partner added",
						id,
					});
				});
		} catch (e) {
			next(e.name && e.name === "ValidationError" ? new ValidationError(e) : e);
		}
	};

	patchGpuById = async (req, res, next) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ 
				errors: errors.array(),
			});
		}

		const {
			idManufacturer, 
			modelName, 
			vram, 
			displayport, 
			hdmi, 
			vga, 
			dvi,
			tdp
		} = req.body;
		try {
			const { id } = req.params;
			const manufacturer = await db
				.promise()
				.query(`select idManufacturer from manufacturers where idManufacturer = ?`, [idManufacturer]);
			if (manufacturer[0].length === 0) {
				return res
					.status(400)
					.json({ message: "Given idManufacturer does not exist" });
			}
			const sql = "UPDATE gpus SET idManufacturer = ?, modelName = ?, vram = ?, displayport = ?, hdmi = ?, vga = ?, dvi = ?, wattage = ? WHERE idGpu = ?";
			let data = [
				idManufacturer, 
				modelName, 
				vram, 
				displayport, 
				hdmi, 
				vga, 
				dvi,
				tdp,
				id,
			];
		
			db.promise()
			.query(sql, data)
			.then(() => {
				return res.status(201).send({
					message: "Gpu updated",
					id,
				});
			});

		} catch (e) {
			next(e.name && e.name === "ValidationError" ? new ValidationError(e) : e);
		}
	};

	patchGpuPartnerById = async (req, res, next) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ 
				errors: errors.array(),
			});
		}

		const {
			idGpu,
			idManufacturer, 
			modelName, 
			clockspeed,
			watercooled,
			height,
			width,
			depth,
			tdp,
			price,
			image,
		} = req.body;
		try {
			const { id } = req.params;
			const manufacturer = await db
				.promise()
				.query(`select idManufacturer from manufacturers where idManufacturer = ?`, [idManufacturer]);
			if (manufacturer[0].length === 0) {
				return res
					.status(400)
					.json({ message: "Given idManufacturer does not exist" });
			}
			const sql = "UPDATE gpu_has_partners SET idGpu = ?, idManufacturer = ?, modelName = ?, clockspeed = ?, watercooled = ?, height = ?, width = ?, depth = ?, wattage = ?, price = ?, image = ? WHERE idGpuPartner = ?";
			let data = [
				idGpu,
				idManufacturer, 
				modelName, 
				clockspeed,
				watercooled,
				height,
				width,
				depth,
				tdp,
				price,
				image,
				id,
			];
		
			db.promise()
			.query(sql, data)
			.then(() => {
				return res.status(201).send({
					message: "Gpu updated",
					id,
				});
			});

		} catch (e) {
			next(e.name && e.name === "ValidationError" ? new ValidationError(e) : e);
		}
	};

	fetchGpuById = async (req, res, next) => {
		try {
			const { id } = req.params;
			const results = await db.promise()
				.query(`SELECT gpus.*, manufacturers.manufacturerName FROM gpus
				LEFT JOIN manufacturers ON gpus.idManufacturer = manufacturers.idManufacturer
				WHERE gpus.idGpu= ?
				AND deleted = 0 
				LIMIT 1;`, [id]);
			if (results[0].length === 0) {
				return res.status(400).json({ message: "GPU does not exist" });
			}
			return res.status(200).send(results[0]);
		} catch (e) {
			next(e);
		}
	};

	fetchGpuPartnerById = async (req, res, next) => {
		try {
			const { id } = req.params;
			const results = await db.promise()
				.query(`SELECT gpu_has_partners.*, gpu_has_partners.wattage as tdp, gpus.modelName AS chipset, gpus.vram, gpus.displayport, gpus.hdmi, gpus.vga, gpus.dvi, manufacturers.manufacturerName, partner.manufacturerName AS partnerName FROM gpu_has_partners
				LEFT JOIN gpus ON gpu_has_partners.idGpu = gpus.idGpu
				LEFT JOIN manufacturers ON gpus.idManufacturer = manufacturers.idManufacturer
				LEFT JOIN manufacturers AS partner ON gpu_has_partners.idManufacturer = partner.idManufacturer
				WHERE gpu_has_partners.idGpuPartner= ?
				AND gpu_has_partners.deleted = 0
				LIMIT 1;`, [id]);
			if (results[0].length === 0) {
				return res.status(400).json({ message: "GPU does not exist" });
			}
			return res.status(200).send(results[0][0]);
		} catch (e) {
			next(e);
		}
	};

	deleteGpuById = async (req, res, next) => {
		try {
			const { id } = req.params;

			let query = `SELECT * FROM gpus WHERE gpus.idGpu= ? LIMIT 1;`;
			let [rows] = await db.promise().query(query, [id]);
			if (rows.length === 0) {
				return res.status(400).json({ message: "GPU does not exist" });
			}
			query = `UPDATE gpus SET deleted = 1 WHERE idGpu= ?`;
			await db.promise().query(query, [id]);
			return res.status(200).send(rows[0]);
		} catch (e) {
			next(e);
		}
	};

	deletePartnerGpuById = async (req, res, next) => {
		try {
			const { id } = req.params;

			let query = `SELECT * FROM gpu_has_partners WHERE gpu_has_partners.idGpuPartner= ? LIMIT 1;`;
			let [rows] = await db.promise().query(query, [id]);
			if (rows.length === 0) {
				return res.status(400).json({ message: "GPU does not exist" });
			}
			query = `UPDATE gpu_has_partners SET deleted = 1 WHERE idGpuPartner= ?`;
			await db.promise().query(query, [id]);
			return res.status(200).send(rows[0]);
		} catch (e) {
			next(e);
		}
	};

}

module.exports = GpuController;
