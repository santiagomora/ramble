function handle_file( req,res ){
    const upfile = req.file;
    return res.status(200).json({
        name:upfile.originalname,
        size:upfile.size,
        type:upfile.mimetype
    })
}

module.exports = {
    handle_file
};
