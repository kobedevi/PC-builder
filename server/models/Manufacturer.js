const {check} = require('express-validator');

const manufacturerModel = [
    check('manufacturerName').notEmpty().withMessage('manufacturerName can not be empty'),
    check('manufacturerName').isLength({max:50}).withMessage('manufacturerName can not be longer than 50 characters'),
];

module.exports = {
    manufacturerModel,
}