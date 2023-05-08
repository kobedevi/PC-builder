const db = require("../utils/db");
const { validationResult } = require("express-validator");
const { v4: uuidv4 } = require("uuid");
const SQL = require("@nearform/sql");

class GpuController {
	fetchGpus = async (req, res, next) => {
		try {
			const results = await db.promise().query(`SELECT * FROM gpus`);
			res.status(200).send(results[0]);
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
				.query(
					SQL`select idManufacturer from manufacturers where idManufacturer = ${idManufacturer}`
				);
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
					res.status(201).send({
						message: "Gpu added",
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
				.query(SQL`SELECT gpus.*, manufacturers.manufacturerName FROM gpus
				LEFT JOIN manufacturers ON gpus.idManufacturer = manufacturers.idManufacturer
				WHERE gpus.idGpu=${id} LIMIT 1;`);
			if (results[0].length === 0) {
				return res.status(400).json({ message: "GPU does not exist" });
			}
			res.status(200).send(results[0]);
		} catch (e) {
			next(e);
		}
	};

	fetchGpuPartnerById = async (req, res, next) => {
		try {
			const { id } = req.params;
			const results = await db.promise()
				.query(SQL`SELECT gpu_has_partners.*, gpus.modelName AS originalCard, gpus.vram, gpus.displayport, gpus.hdmi, gpus.vga, gpus.dvi, manufacturers.manufacturerName, partner.manufacturerName AS partnerName FROM gpu_has_partners
				LEFT JOIN gpus ON gpu_has_partners.idGpu = gpus.idGpu
				LEFT JOIN manufacturers ON gpus.idManufacturer = manufacturers.idManufacturer
				LEFT JOIN manufacturers AS partner ON gpu_has_partners.idManufacturer = partner.idManufacturer
				WHERE gpu_has_partners.idGpuPartner=${id} LIMIT 1;`);
			if (results[0].length === 0) {
				return res.status(400).json({ message: "GPU does not exist" });
			}
			res.status(200).send(results[0]);
		} catch (e) {
			next(e);
		}
	};

	fetchGpuPartners = async (req, res, next) => {
		try {
			const results = await db
				.promise()
				.query(`SELECT * FROM gpu_has_partners`);
			res.status(200).send(results[0]);
		} catch (e) {
			next(e);
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
			wattage,
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

			const gpu = await db
				.promise()
				.query(`select idGpu from gpus where idGpu = "${idGpu}"`);
			if (gpu[0].length === 0) {
				return res.status(400).json({ message: "Given idGpu does not exist" });
			}

			const id = uuidv4();
			const sqlInsert =
				"INSERT INTO gpu_has_partners (idGpuPartner, idGpu, idManufacturer, modelName, clockspeed, watercooled, height, width, depth, wattage) VALUES (?,?,?,?,?,?,?,?,?,?)";
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
					wattage,
				])
				.then(() => {
					res.status(201).send({
						message: "Gpu Partner added",
						id,
					});
				});
		} catch (e) {
			next(e.name && e.name === "ValidationError" ? new ValidationError(e) : e);
		}
	};
}

module.exports = GpuController;
