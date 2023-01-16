const multer = require("multer");
const path = require("path");

// Multer config
module.exports = multer({
	storage: multer.diskStorage({
		filename: function (req, file, cb) {
			cb(null, file.originalname);
		},
	}),
	fileFilter: (req, file, cb) => {
		if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
			cb(null, true);
			return;
		}
		cb(null, false);
	},
});
