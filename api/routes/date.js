const express = require('express');

const { handle_date,handle_epoch,handle_empty } = require( config( 'path.controllers' ) ).date;

const { validation,date } = require( config( 'path.middleware' ) );

const { dateValidation,epochValidation } = date;

const router = express.Router();

router.get(
    "/:date/:format",
    validation( dateValidation,'params' ),
    handle_date
);

router.get(
    "/:date",
    validation( epochValidation,'params' ),
    handle_epoch
);

router.get(
    "/",
    handle_empty
);

module.exports = router;
