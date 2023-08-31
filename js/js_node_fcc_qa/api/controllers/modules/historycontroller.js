http://127.0.0.1:3000/api/exercise/log?userId=6003e74c16680b379515f351&to=2010&limit=3

const mongoose = require( 'mongoose' );

function build_exercise_log_query( {userId,from,to,limit,skip} ){
    const query = {
        exer_user_id:mongoose.Types.ObjectId( userId ),
        $and:[
            {
                'exer_date':{
                    ...( from && { $gte: new Date( from ) } ),
                    ...( to && { $lte: new Date( to ) } )
                }
            }
        ]
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
//
// function build_exercise_log_query( {userId,from,to,limit} ){
//     const match_agg = {
//         $match:{
//             _id:mongoose.Types.ObjectId( userId )
//         }
//     };
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
//         filter_agg,
//         ...( limit && limit_agg||[] ),
//         skip_agg
//     ];
// }

