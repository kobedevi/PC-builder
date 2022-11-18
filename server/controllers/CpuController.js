const db = require('../utils/db');
const {validationResult} = require('express-validator');

class CpuController {
    
    fetchCpus = async (req, res, next) => {
        try {
            const results = await db.promise().query(`SELECT * FROM cpus`);
            res.status(201).send(results[0])
        } catch (e) {
            next(e);
        }
    }

    createCpu = (req, res, next) => {

        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }

        const {modelName, clockSpeed, cores} = req.body;
        if(modelName && clockSpeed && cores) {
            try {
                const sqlInsert = "INSERT INTO cpus (model_name, clockspeed, cores) VALUES (?,?,?)";
                db.promise().query(sqlInsert, [
                    modelName, 
                    clockSpeed, 
                    cores
                ]);
                res.status(201).send({message: "Created CPU"})
            } catch (e) {
                next(e.name && e.name === "ValidationError" ? new ValidationError(e) : e);
            }
        }
    }
}

module.exports = CpuController;