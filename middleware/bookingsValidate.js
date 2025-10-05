const validator = require('../helpers/validate');

const saveBooking = (req, res, next) => {
    const validationRule = {
        user: 'required|string',
        class: 'required|string',
        status: 'required|string',
        createdAt: 'string'
    };

    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            return res.status(412).send({
                success: false,
                message: 'Validation failed',
                data: err
            });
        } else {
            next();
        }
    });
};

module.exports = {
    saveBooking
};
