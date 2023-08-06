const db = require("../utils/db");
const { validationResult } = require("express-validator");
const { v4: uuidv4 } = require("uuid");
const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');


class PsuController {
	fetchPsu = async (req, res, next) => {
		try {
			const { page=Math.abs(page) || 0, perPage=20 } = req.params;

			const pageAmount = await db.promise().query("SELECT COUNT(idPsu) as totalProducts FROM psu WHERE deleted = 0")
			.then(res => Math.ceil(res[0][0].totalProducts / perPage))

			const results = await db.promise().query(`SELECT * FROM psu
			WHERE deleted = 0 LIMIT ? OFFSET ?;`, [parseInt(perPage), parseInt(page*perPage)]);
			res.status(200).send({results: results[0], pageAmount});
		} catch (e) {
			console.log(e);
			next(e);
		}
	};

	fetchPsuById = async (req, res, next) => {
		try {
			const { id } = req.params;
			const results = await db.promise()
				.query(`SELECT psu.*, manufacturers.manufacturerName FROM psu
				LEFT JOIN manufacturers ON psu.idManufacturer = manufacturers.idManufacturer
				WHERE psu.idPsu= ?
				AND deleted = 0
				LIMIT 1;`, [id]);
			if (results[0].length === 0) {
				return res.status(400).json({ message: "PSU does not exist" });
			}
			res.status(200).send(results[0][0]);
		} catch (e) {
			next(e);
		}
	};

	fetchPsuByFilter = async (req, res, next) => {
		try {
			let { query } = req.params;
			let encodedStr = query.replace(/\%/g,"Percent");
			encodedStr = query.replace(/[/^#\%]/g,"")
			encodedStr = encodedStr.replace(/[\u00A0-\u9999<>\&]/gim, i => '&#'+i.charCodeAt(0)+';')

			const userQuery = `SELECT * FROM psu
			LEFT JOIN manufacturers ON psu.idManufacturer = manufacturers.idManufacturer
			WHERE CONCAT_WS('', modelName, manufacturerName, modular, wattage) LIKE ?
			AND deleted = 0;`;
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

	fetchPsusByBuild = async(req, res, next) => {
		try {
			const { wattage, page=Math.abs(page) || 0, perPage=20 } = req.params;

			const pageAmount = await db.promise().query("SELECT COUNT(idPsu) as totalProducts FROM psu WHERE deleted = 0")
			.then(res => Math.ceil(res[0][0].totalProducts / perPage))

			const userQuery = `SELECT * FROM psu
			LEFT JOIN manufacturers ON psu.idManufacturer = manufacturers.idManufacturer
			WHERE psu.wattage >= ?
			AND psu.deleted = 0
			ORDER BY wattage
			LIMIT ? OFFSET ?;`;
			const [rows] = await db.promise().query(userQuery, [wattage, parseInt(perPage), parseInt(page*perPage)]);
			res.status(200).send({results: rows, pageAmount});
		} catch (e) {
			next(
				e.name && e.name === "ValidationError" ? new ValidationError(e) : e
			);
		}
	}

	patchPsuById = async (req, res, next) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ 
				errors: errors.array(),
			});
		}

		const {
			idManufacturer,
			modelName,
			modular,
			idFormfactor,
			wattage,
			height,
			width,
			depth,
			image
		} = req.body;
		try {
			const { id } = req.params;
			const manufacturer = await db
				.promise()
				.query(
					`select idManufacturer from manufacturers where idManufacturer = ?`
				,[idManufacturer]);
			if (manufacturer[0].length === 0) {
				return res
					.status(400)
					.json({ message: "Given idManufacturer does not exist" });
			}
			const formfactor = await db
				.promise()
				.query(
					`select idFormfactor from formfactors where idFormfactor = ?`
				,[idFormfactor]);
			if (formfactor[0].length === 0) {
				return res
					.status(400)
					.json({ message: "Given idFormfactor does not exist" });
			}
			const sql = "UPDATE Psu SET idManufacturer = ?, modelName = ?, modular = ?, idFormfactor = ?, wattage = ?, height = ?, width = ?, depth = ?, image = ? WHERE idPsu = ?";
			let data = [
				idManufacturer,
				modelName,
				modular,
				idFormfactor,
				wattage,
				height,
				width,
				depth,
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

	createPsu = async (req, res, next) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const {
			idManufacturer,
			idFormfactor,
			modelName,
			height,
			width,
			depth,
			wattage,
			modular,
			image
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
			const formfactor = await db
				.promise()
				.query(
					`select idFormfactor from formfactors where idFormfactor = "${idFormfactor}"`
				);
			if (formfactor[0].length === 0) {
				return res
					.status(400)
					.json({ message: "Given formfactor does not exist" });
			}
			const id = uuidv4();
			const sqlInsert =
				"INSERT INTO psu (idPsu, idManufacturer, idFormfactor, modelName, height, width, depth, wattage, modular, image) VALUES (?,?,?,?,?,?,?,?,?,?)";
			db.promise()
				.query(sqlInsert, [
					id,
					idManufacturer,
					idFormfactor,
					modelName,
					height,
					width,
					depth,
					wattage,
					modular,
					image
				])
				.then(() => {
					res.status(201).send({
						message: "PSU added",
						id,
					});
				});
		} catch (e) {
			next(e.name && e.name === "ValidationError" ? new ValidationError(e) : e);
		}
	};

	deletePsuById = async (req, res, next) => {
		try {
			const { id } = req.params;

			let query = `SELECT * FROM psu WHERE idPsu = ? LIMIT 1;`;
			let [rows] = await db.promise().query(query, [id]);
			if (rows.length === 0) {
				return res.status(400).json({ message: "PSU does not exist" });
			}
			query = `UPDATE psu SET deleted = 1 WHERE idPsu = ?;`;
			await db.promise().query(query, [id]);
			res.status(200).send(rows[0]);
		} catch (e) {
			next(e);
		}
	};

	scrape = async(req,res,next) => {
		try {
			// Launch the browser and open a new blank page
			// const browser = await puppeteer.launch({
			// 	headless: false, //debugging
			// 	defaultViewport: false,
			// });
			// const page = await browser.newPage();
			// let currentPage = 1;
			// // const url = "https://azerty.nl/componenten/cpu?p=1&product_list_limit=50"
			// let url = `https://azerty.nl/componenten/voedingen?p=${currentPage}&product_list_limit=50`
			// await page.goto(`${url}`, {
			// 	waitUntil: "networkidle0",
			// });

			// const productAmount = await page.evaluate(() =>{
			// 	const amount = document.querySelector("#toolbar-amount span.toolbar-number").innerHTML;
			// 	return parseInt(amount)
			// });
			// let currentProduct = 0;
			// let is_disabled = false;

			// while (!is_disabled) {

			// 	const products = await page.$$(".product-items > .product-item");

			// 	for (const product of products) {

			// 		let title = "Null";
			// 		let price = "Null";
			// 		let img = "Null";

			// 		try {
			// 			title = await page.evaluate(
			// 			  (el) => el.querySelector(".product-item-name").textContent,
			// 			  product
			// 			);
			// 		} catch (error) {}
			// 		try {
			// 			price = await page.evaluate(
			// 			  (el) => el.querySelector(".price").textContent,
			// 			  product
			// 			);
			// 		} catch (error) {}
			// 		try {
			// 			img = await page.evaluate(
			// 			  (el) => el.querySelector(".product-image-photo").getAttribute("src"),
			// 			  product
			// 			);
			// 		} catch (error) {}
			// 		if (title !== "Null") {
			// 			fs.appendFile(
			// 			  `${__dirname}/results.csv`,
			// 			  `${title.replace(/,/g, ".")},${price.replace(/,/g, ".")},${img.split('?')[0]}\n`,
			// 			  function (err) {
			// 				if (err) throw err;
			// 			  }
			// 			);
			// 		}
			// 	}

			// 	currentPage = currentPage+1;
			// 	currentProduct = currentProduct + 50;
			// 	is_disabled = productAmount < currentProduct;
				
			// 	if(!is_disabled) {
			// 		await page.goto(`https://azerty.nl/componenten/voedingen?p=${currentPage}&product_list_limit=50`);
			// 	}
			// }

			// await browser.close();
			
			fs.appendFile(
				`${__dirname}/results.csv`,
				`${'zever'},${'nog wa zever'},${'en nog wa'}\n`,
				function (err) {
					if (err) throw err;
				}
			);

			const options = {
				root: path.join(__dirname)
			};
			const fileName = './results.csv';
			res.sendFile(fileName, options,  function (err) {
				if (err) {
					next(err);
				} else {
					console.log('Sent:', fileName);
				}
			});

		} catch (e) {
			console.log(e);
			next(e);
		}
	}
}

module.exports = PsuController;
