const router = require('express').Router();
const passport = require('passport');

router.use('/users', require('./users'));
router.use('/classes', require('./classes'));
router.use('/memberships', require('./memberships'));
router.use('/bookings', require('./bookings'));
router.use('/', require('./swagger'));

// router.get('/', (req, res) => {
    //#swagger.tags=['Hello World]
    //res.send('Hello World');
//});

router.get('/login', passport.authenticate('github'), (req, res) => {});

router.get('/logout', function(req, res, next) {
    req.logout(function(err) {
        if (err) {
            return next(err);
        }
        res.redirect('/');
    })
});

module.exports = router;