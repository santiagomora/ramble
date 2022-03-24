const mongoose = require( 'mongoose' );

function build_exercise_log_query( {userId,from,to,limit,skip} ){
    const query = {
        exer_user_id:mongoose.Types.ObjectId( userId ),
        ...(
            ( from||to ) && {
                $and:[
                    {
                        'exer_date':{
                            ...( from && { $gte: new Date( from ) } ),
                            ...( to && { $lte: new Date( to ) } )
                        }
                    }
                ]
            }
        )
    };
    const options = {
        ...( limit && {limit:parseInt( limit ) } ),
        ...( skip && {skip:parseInt( skip ) } ),
    };
    return {query,options};
}

module.exports ={
    build_exercise_log_query
};

// function build_exercise_log_query( {userId,from,to,limit} ){
//     const match_agg = {
//         $match:{
//             _id:mongoose.Types.ObjectId( userId )
//         }
//     };
//     const unwind_agg = {
//         $unwind:"$user_exercises"
//     }
//     const root_agg = {
//         $root:{
//             newRoot:"$user_exercises"
//         }
//     }
//     const filter_agg = {
//         $match:{
//             $and:[
//                 {
//                     'exer_date':{
//                         ...( from && { $gte: new Date( from ) } ),
//                         ...( to && { $lte: new Date( to ) } )
//                     }
//                 }
//             ]
//         }
//     };
//     const limit_agg = [{
//         $limit: 0 + parseInt( limit )
//     }];
//     const skip_agg = {
//         $skip:0
//     };
//     return [
//         match_agg,
//         unwind_agg,
//         root_agg,
//         filter_agg,
//         ...( limit && limit_agg||[] ),
//         skip_agg
//     ];
// }
