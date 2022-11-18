const NotFoundError = require('../errors/NotFoundError');
const ValidationError = require('../errors/ValidationError');
// const authRoutes = require('./authRoutes');
// const { authLocal, authJwt } = require('../services/auth/auth.services');
const {check, validationResult} = require('express-validator');

const registerRoutes = (app, db) => {

    app.post('/cpu', [
        check('modelName').notEmpty().withMessage('modelName can not be empty'),
        check('clockSpeed').isFloat({min:.1, max:100}).withMessage('cores must be of type float, with a max size of 4'),
        check('clockSpeed').notEmpty().withMessage('clockSpeed can not be empty'),
        check('cores').isInt({min:1, max: 100}).withMessage('cores must be of type integer between 1 and 100'),
        check('cores').notEmpty().withMessage('cores can not be empty'),
    ],(req, res, next) => {

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
    })

    app.get('/cpu', async (req, res, next) => {
        try {
            const results = await db.promise().query(`SELECT * FROM cpus`);
            res.status(201).send(results[0])
        } catch (e) {
            next(e);
        }
    })


    // default 404
    app.use(function (req, res, next) {
        next(new NotFoundError());
    });

    // error handler
    app.use(function (err, req, res, next) {
        res.status(err.statusCode || 500);
        res.json(err);
    });
};

module.exports = {
    registerRoutes,
}