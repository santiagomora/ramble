const multer = require( 'multer' );

const {public} = require( './path' );

const upload_dir = `${public}/uploads`

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb( null,upload_dir )
    },
    filename: function (req, file, cb) {
        cb( null,file.originalname )
    }
})

module.exports = storage;
