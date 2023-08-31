const express = require('express');

const multer = require('multer');

const {file} = require( config( 'path.controllers' ) );

const {handle_file} = file;

const router = express.Router();

const storage = config( 'storage' );

const upload = multer({storage});

router.post(
    "/",
    upload.single( 'upfile' ),
    handle_file
);

module.exports = router;
