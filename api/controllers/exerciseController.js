const mongoose = require( 'mongoose' );

const {Exercise} = require( config( 'path.models' ) );

const {get_user_exercises,add_exercise} = Exercise.methods;

function format_log_response( req,user_exercises ){
    const {found_user} = req.body;
    const {from,to} = req.query;
    return {
        ...found_user.toObject(),
        count:user_exercises.length,
        ...( from && { from: (new Date( from )).toDateString() } ),
        ...( to && { to: (new Date( to )).toDateString() } ),
        log:user_exercises
    };
}

async function handle_add_exercise( req,res ){
    const {found_user,userId} = req.body;
    const exer_res = {
        ...await add_exercise( found_user,req.body ),
        ...found_user.toObject()
    }
    return res.status(200).json( exer_res );
}

async function handle_exercise_logs( req,res ){
    const user_exercises = await get_user_exercises( req.query )||[]
    return res.status(200).json( format_log_response( req,user_exercises ) );
}

module.exports = {
    handle_add_exercise,
    handle_exercise_logs,
};
