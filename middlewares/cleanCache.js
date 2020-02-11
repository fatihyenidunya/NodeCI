const { clearHash } = require('../services/cache');

// to understand this you should check advanced nodejs course lesson 68  on udemy


module.exports = async (req, res, next) => {

    await next();

    clearHash(req.user.id);

}