const { process_format } = require( config( 'path.helper' ) ).dateHelper;

function utc_date( valid_date ){
    return {
        unix: valid_date.getTime(),
        utc: valid_date.toUTCString()
    };
}

function invalid_date(){
    return {
        error:'Invalid Date'
    };
}

function handle_date( req,res ){
    const {date,format} = req.params;
    const valid_date =  process_format[ format.toLowerCase() ]( date.split('-') );
    return valid_date
        ? res.status(200).json( utc_date( new Date( valid_date ) ) )
        : res.status(422).json( invalid_date() );
}

function handle_epoch( req,res ){
    const {date} = req.params;
    const eval_date = ( /^\d+$/gi.test( date ) )
        ? parseInt( date )
        : date;
    const date_res = new Date( eval_date );
    return !isNaN( date_res.getTime() )
        ? res.status(200).json( utc_date( date_res ) )
        : res.status(422).json( invalid_date() );
}

function handle_empty( req,res ){
    return res.status(200).json( utc_date( new Date() ) );
}

module.exports = {
    handle_epoch,
    handle_date,
    handle_empty
};
