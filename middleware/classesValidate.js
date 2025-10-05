const validator = require('../helpers/validate');

const saveClass = (req, res, next) => {
    const validationRule = {
        title: 'required|string',
        description: 'required|string',
        trainer: 'required|string',
        capacity: 'required|number',
        schedule: 'required|string',
        duration: 'required|string',
        location: 'required|string'
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
    saveClass
};
