const db = require("../utils/db");
const { validationResult } = require("express-validator");
const cloudinary = require("../utils/cloudinary");

class UploadController {
	
    uploadImage = async(req, res, next) => {
        try {
            // Upload image to cloudinary
            await cloudinary.uploader.upload(req.file.path)
            .then((data) => {
                res.status(200).json({link: data.secure_url});
            })
        } catch (err) {
            res.status(400).json({message:'File size too large'});
        }
    }
}

module.exports = UploadController;
