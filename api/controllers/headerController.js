function handle_header( req,res ){
    return res.status(200).json({
        ipaddress:req.connection.remoteAddress,
        software:req.headers['user-agent'],
        language:req.headers['accept-language']
    })
}

module.exports = {
    handle_header
};
