const express = require('express');

const {header} = require( config( 'path.controllers' ) );

const router = express.Router();

const {handle_header} = header;

router.get(
    "/",
    handle_header
);

module.exports = router;
