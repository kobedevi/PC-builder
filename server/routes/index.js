const NotFoundError = require('../errors/NotFoundError');
const ValidationError = require('../errors/ValidationError');
// const authRoutes = require('./authRoutes');
// const { authLocal, authJwt } = require('../services/auth/auth.services');
const CpuController = require('../controllers/CpuController');
const {cpuModel} = require('../models/Cpu')

const cpuController = new CpuController();

const registerRoutes = (app, db) => {

    app.post('/cpu', cpuModel ,cpuController.createCpu)
    app.get('/cpu', cpuController.fetchCpus)

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