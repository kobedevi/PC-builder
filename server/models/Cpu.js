const {check} = require('express-validator');

const cpuModel = [
    check('modelName').notEmpty().isLength({max:100}).withMessage('modelName can not be empty'),
    check('clockSpeed').isFloat({min:.1, max:100}).withMessage('cores must be of type float, with a max size of 4'),
    check('clockSpeed').notEmpty().withMessage('clockSpeed can not be empty'),
    check('cores').isInt({min:1, max: 100}).withMessage('cores must be of type integer between 1 and 100'),
    check('cores').notEmpty().withMessage('cores can not be empty'),
];

module.exports = {
    cpuModel,
}