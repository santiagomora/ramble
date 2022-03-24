module.exports = function (req,res,next) {
    res.header('Content-Type','application/json')
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000')
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, X-Token-Auth');
    // cookie auth headers
    // res.header('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, X-Token-Auth, Authorization');
    // res.header('Access-Control-Allow-Credentials', 'true')
    next();
}
