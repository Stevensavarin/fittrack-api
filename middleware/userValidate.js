const validator = require('../helpers/validate');

const saveUser = (req, res, next) => {
    const validationRule = {
        username: 'required|string',
        email: 'required|email',
        password: 'required|string',
        role: 'string',
        membership: 'string'
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
    saveUser
};