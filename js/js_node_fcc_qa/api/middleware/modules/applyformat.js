const formatindex = require('../../format/index');

module.exports = function( formatname ){
    return function (req,res,next) {
        if (req.data)
            res.json( { data:formatindex[formatname](req.data) } );
        next();
    }
}
