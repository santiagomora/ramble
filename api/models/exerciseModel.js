const mongoose = require('mongoose');

const {build_exercise_log_query} = require( config( 'path.helper' ) ).queryHelper;

const {connection} = config( 'mongoose' );

const collection_name = 'user_exercises';

const {Schema} = mongoose;

const exer_format_options = {
    getters:true,
    virtuals:true,
    aliases:true,
    transform: ( data,{_id,duration,description,date}  ) => ({
        _id,duration,description,date
    })
};

const exercise_schema = new Schema({
        exer_user_id:{
            type:Schema.Types.ObjectId,
            ref:"User",
            alias:"userId"
        },
        exer_description:{
            type:String,
            required:true,
            alias:"description"
        },
        exer_duration:{
            type:Number,
            required:true,
            alias:"duration"
        },
        exer_date:{
            type:Date,
            alias:"date",
            get: ( date ) => date ? ( new Date( date ) ).toDateString() : undefined
        }
    },{
        toJSON:exer_format_options,
        toObject:exer_format_options
    }
);

const Exercise = connection.model( 'Exercise',exercise_schema,collection_name );

/*
 * database methods
 */
function add_exercise( user,exercise = {
    description,
    duration,
    date,
    userId
}){
    return new Promise(
        (resolve,reject) => {
            Exercise.create(
                Exercise.translateAliases( exercise ),
                function ( err,doc ){
                    if ( err )
                        throw err;
                    resolve( doc.toObject() );
                }
            );
        }
    ).catch( e => {
        console.error( e )
        return e;
    } );
}

function get_user_exercises( query_obj ){
    const {query,options} = build_exercise_log_query( query_obj )
    return new Promise(
        ( resolve,reject ) => {
            const agg = Exercise.find(
                query,
                null,
                options,
                function( err,data ){
                    if( err )
                        reject( err )
                    resolve( data )
                }
            );
        }
    ).catch(
        e => {
            console.error( e );
            return e;
        }
    )
}

const methods = {
    add_exercise,
    get_user_exercises
}

module.exports = {
    model:Exercise,
    methods
}
