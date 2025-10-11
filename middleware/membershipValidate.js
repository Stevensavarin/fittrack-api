const validator = require('../helpers/validate');

const saveMembership = (req, res, next) => {
    const validationRule = {
        name: 'required|string',
        price: 'required|number',
        duration: 'required|number',
        benefits: 'string'
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
    saveMembership
};