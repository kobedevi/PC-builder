const db = require('../utils/db');
const {validationResult} = require('express-validator');

class ManufacturerController {
    
    fetchManufacturers = async (req, res, next) => {
        try {
            const results = await db.promise().query(`SELECT * FROM manufacturers`);
            res.status(201).send(results[0])
        } catch (e) {
            next(e);
        }
    }

    createManufacturer = (req, res, next) => {

        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }

        const {manufacturerName} = req.body;
        if(manufacturerName) {
            try {
                const sqlInsert = "INSERT INTO manufacturers (manufacturerName) VALUES (?)";
                db.promise().query(sqlInsert, [
                    manufacturerName
                ]);
                res.status(201).send({message: "Added Manufacturer"})
            } catch (e) {
                next(e.name && e.name === "ValidationError" ? new ValidationError(e) : e);
            }
        }
    }
}

module.exports = ManufacturerController;