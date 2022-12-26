const db = require("../utils/db");
const { validationResult } = require("express-validator");
const { v4: uuidv4 } = require("uuid");

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
					`select idManufacturer from manufacturers where idManufacturer = "${idManufacturer}"`
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
					`select idManufacturer from manufacturers where idManufacturer = "${idManufacturer}"`
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
