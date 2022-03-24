const express = require('express');

const { validation,user,exercise } = require( config( 'path.middleware' ) );

const controllers = require( config( 'path.controllers' ) );

const { userValidation } = user;

const { exerciseValidation,logValidation } = exercise;

const { handle_create_user,get_users } = controllers.user;

const {  handle_add_exercise,handle_exercise_logs } = controllers.exercise;

const router = express.Router();

router.post(
    "/new-user",
    validation( userValidation,'body' ),
    handle_create_user
);

router.post(
    "/add",
    validation( exerciseValidation,'body' ),
    handle_add_exercise
);

router.get(
    "/log",
    validation( logValidation,'query' ),
    handle_exercise_logs
);

router.get(
    "/users",
    get_users
);

module.exports = router;
