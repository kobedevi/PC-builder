const NotFoundError = require('../errors/NotFoundError');
// const authRoutes = require('./authRoutes');
// const { authLocal, authJwt } = require('../services/auth/auth.services');

const registerRoutes = (app, db) => {

    app.post('/cpu', async (req, res, next) => {
        const {modelName, clockSpeed, cores} = req.body;
        if(modelName && clockSpeed && cores) {
            try {
                const sqlInsert = "INSERT INTO cpus (model_name, clockspeed, cores) VALUES (?,?,?)";
                await db.promise().query(sqlInsert, [
                    modelName, 
                    clockSpeed, 
                    cores
                ]);
                res.status(201).send({message: "info test"})
            } catch (e) {
                console.log(e)
                next(e.name && e.name === "ValidationError" ? new ValidationError(e) : e);
            }
        }
    })

    app.get('/cpu', async (req, res, next) => {
        try {
            const results = await db.promise().query(`SELECT * FROM cpus`);
            res.status(201).send(results[0])
        } catch (e) {
            console.log(e)
            next(e.name && e.name === "ValidationError" ? new ValidationError(e) : e);
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