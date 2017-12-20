const route = require('express').Router();

route.use('/admin', require('./admin'));
route.use('/student', require('./student'));
route.use('/teacher', require('./teacher'));

module.exports = route;